import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Cron, CronExpression } from '@nestjs/schedule'
import { RegionConsumptionsRepository } from './regionConsumptions.repository'
import { RegionConsumption } from './regionConsumption.entity'
import { addDaysToDate, getDayOnlyFromDate, getDateMonthBounds, removeDaysFromDate } from './../utils/date.utils'
import { EnedisOpenDataAPI } from './../services/EnedisOpenDataAPI'
import { RegionsService } from './../regions/regions.service'
import { Region } from './../regions/region.entity'

const OPEN_DATA_API_STEP_SIZE = 1000

@Injectable()
export class RegionConsumptionsService {
	constructor(
		@InjectRepository(RegionConsumptionsRepository)
		private repository: RegionConsumptionsRepository,
		private regionsService: RegionsService
	) {}

	@Cron('05 45 11 * * *')
	// @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
	async loadOpenDataConsumption() {
		console.log(`${(new Date()).toISOString()} CRON - Executing 'loadOpenDataConsumption' CRON.`)
		
		/**
		 * Formatted consumption type
		 */
		type FormattedConsumption = {
			date: string,
			totalConsumptionWatt: number,
			totalUsagePoints: number,
			subscribedPowerkVA: number
		}[]

		/**
		 * Get formatted records from raw query records.
		 * @param records The records to format.
		 * @returns The formatted records.
		 */
		const _getFormattedConsumption = (records: any[]): FormattedConsumption => {
			const consumptionFormatted = []
			for (let record of records) {
				const {
					total_energie_soutiree_wh,
					nb_points_soutirage,
					plage_de_puissance_souscrite
				} = record.fields

				// Dot not get useless power ranges
				const subscribedPowerkVA = EnedisOpenDataAPI.consumptionRanges[plage_de_puissance_souscrite]
				if (!subscribedPowerkVA) continue

				// Add data only if valid
				if (nb_points_soutirage && total_energie_soutiree_wh) {
					// Get the consumption for this datetime and subscribed power range
					const consumption = consumptionFormatted.find(c => (
						c.date === record.fields.horodate
						&& c.subscribedPowerkVA === subscribedPowerkVA
					))

					// If the consumption already exists, update it
					if (consumption) {
						consumption.totalConsumptionWatt += total_energie_soutiree_wh / 2,
						consumption.totalUsagePoints += nb_points_soutirage
					}
					// If not, add it
					else {
						consumptionFormatted.push({
							date: record.fields.horodate,
							totalConsumptionWatt: total_energie_soutiree_wh / 2,
							totalUsagePoints: nb_points_soutirage,
							subscribedPowerkVA: subscribedPowerkVA
						})
					}
				}
			}

			return consumptionFormatted
		}

		/**
		 * Save the consumption to our database.
		 * @param consumptionFormatted The formatted consumption fetched from the API.
		 * @param region The region of the consumption.
		 */
		const _saveConsumption = async (consumptionFormatted: FormattedConsumption, region: Region) => {
			for (let consumption of consumptionFormatted) {
				const regionConsumption = new RegionConsumption()
				regionConsumption.region = region
				regionConsumption.date = new Date(consumption.date)
				regionConsumption.subscribedPowerkVA = consumption.subscribedPowerkVA
				regionConsumption.valueWatt = consumption.totalConsumptionWatt / consumption.totalUsagePoints

				await this.repository.save(regionConsumption)
			}
		}

		// Get the last date loaded in our database
		// If no data loaded, take 6 months back
		const lastDateLoaded =
			(await this.getLastDateLoaded())
			?? removeDaysFromDate(
				getDateMonthBounds(
					new Date(Date.now() - 6 * 31 * 24 * 3600 * 1000)
				).start,
				1
			)

		// Test if there is new data available on the Enedis OpenData API
		const isDataOnline = await EnedisOpenDataAPI.isDataOnlineForDate(
			addDaysToDate(lastDateLoaded, 1),
			'conso-inf36-region'
		)

		// End CRON if no data to load
		if (!isDataOnline) {
			console.log(`${(new Date()).toISOString()} CRON - No data to fetch.`)
			return
		}

		// The total number of records loaded
		let totalRecordsLoaded = 0

		// Get data for each region in database
		const regions = await this.regionsService.getAll()
		for (let region of regions) {
			// Load both API datasets
			for (let dataset of ['conso-inf36-region', 'conso-sup36-region']) {
				let records = []
				let offset = 0
				let dateToLoad = addDaysToDate(lastDateLoaded, 1)
				let numbersOfDaysWithoutData = 0

				// Load day while there is data available
				while (true) {
					// Format day to load for API
					const dayToLoad = getDayOnlyFromDate(dateToLoad).split('-').join('/')

					console.log(`${(new Date()).toISOString()} CRON - Loading day ${dayToLoad} for region ${region.name} (${dataset}) from record ${offset} to ${offset + OPEN_DATA_API_STEP_SIZE}.`)

					// Fetch data from API
					const data = await (await EnedisOpenDataAPI.getGlobalConsumptionForRegion(
						region,
						dayToLoad,
						OPEN_DATA_API_STEP_SIZE,
						offset,
						dataset
					)).json()

					// Add data to records
					records = records.concat(data.records)
					totalRecordsLoaded += data.records?.length ?? 0

					// Update offset for next call
					offset += OPEN_DATA_API_STEP_SIZE

					// If all data is loaded for this day, go to next day
					if (data.records?.length !== OPEN_DATA_API_STEP_SIZE) {
						console.log(`${(new Date()).toISOString()} CRON - Loaded ${data.records.length} more.`)
						
						// If failed to fetch data for 10 days, we consider there
						// is no more data to load
						numbersOfDaysWithoutData += data.records?.length ? 0 : 1
						if (numbersOfDaysWithoutData > 10) break

						// Save consumption of the day
						const consumptionFormatted = _getFormattedConsumption(records)
						await _saveConsumption(consumptionFormatted, region)

						console.log(`${(new Date()).toISOString()} CRON - Saved data for day ${dayToLoad}. Going to next day.`)

						// Setup the next day
						dateToLoad = addDaysToDate(dateToLoad, 1)
						offset = 0
						records = []
					} else {
						console.log(`${(new Date()).toISOString()} CRON - Loaded ${data.records.length} more. Total : ${records.length}`)
					}
				}
			}
		}

		console.log(`${(new Date()).toISOString()} CRON - Loaded a total of ${totalRecordsLoaded} records.`)
	}

	async getById(id: number): Promise<RegionConsumption> {
		return await this.repository.findOneOrFail(id)
	}

	async getLastDateLoaded(): Promise<Date> {
		return (await this.repository.find({
			take: 1,
			order: { date: 'DESC' }
		}))[0]?.date ?? null
	}
}

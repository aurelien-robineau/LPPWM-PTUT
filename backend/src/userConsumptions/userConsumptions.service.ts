import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserConsumptionsRepository } from './userConsumptions.repository'
import { UserConsumption } from './userConsumption.entity'
import { getDayOnlyFromDate, getDateMonthBounds, getDateWeekBounds, getNumberOfDaysBetweenDates } from 'src/utils/date.utils'
import { User } from 'src/users/user.entity'
import { UsagePointsService } from 'src/usagePoints/usagePoints.service'
import { addDaysToDate } from './../utils/date.utils'
import { UsersService } from './../users/users.service'
import { EnedisDataHubAPI } from 'src/services/EnedisDataHubAPI'

@Injectable()
export class UserConsumptionsService {
	constructor(
		@InjectRepository(UserConsumptionsRepository)
		private repository: UserConsumptionsRepository,
		private usagePointsService: UsagePointsService,
		private usersService: UsersService
	) {}

	/**
	 * Get a user consumption by its id.
	 * @param id The id of the user consumption.
	 * @returns The user consumption with this id.
	 */
	async getById(id: number): Promise<UserConsumption> {
		return await this.repository.findOneOrFail(id)
	}

	/**
	 * Get the user's consumption between two dates.
	 * @param usagePointId The id in our database of the usage point we want the
	 * consumption from.
	 * @param start The first day of the interval to load. The first day is
	 * included in the results.
	 * @param end The last day of the interval to load. The last day is **NOT**
	 * included in the results.
	 * @returns The consumptions between these dates for this user.
	 */
	async getBetweenDates(usagePointId: number, start: Date, end: Date): Promise<UserConsumption[]> {
		return await this.repository.createQueryBuilder('USER_CONSUMPTION')
			.where('USER_CONSUMPTION.USAGE_POINT_ID = :usagePointId', { usagePointId })
			.andWhere('USER_CONSUMPTION.DATE >= :start', { start: getDayOnlyFromDate(start) })
			.andWhere('USER_CONSUMPTION.DATE < :end', { end: getDayOnlyFromDate(end) })
			.getMany()
	}

	/**
	 * Get the consumption of a user for a usage point and for a date. If the
	 * consumption does not exists in our database, fetch it from the Enedis
	 * DataHub API and save it to our database.
	 * @param user The user for which to get the consumption.
	 * @param usagePointId The usage point's id from which to get the consumption.
	 * @param date The date of the day whe want the consumption for.
	 * @param type The length of time we want the consumption for.  
	 * * `DAY`: Get the consumption for the date of the date.
	 * * `WEEK`: Get the consumption for the week containing the date.
	 * * `MONTH`: Get the consumption for the month containing the date.
	 * @returns The consumptions for this user, usage point and date.
	 */
	async getUserConsumptions(
		user: User,
		usagePointId: number,
		date: Date,
		type: 'DAY'|'WEEK'|'MONTH'
	) {
		const usagePoint = await this.usagePointsService.getById(usagePointId)

		if (!usagePoint) {
			throw new HttpException(
				'Le point d\'usage demandé n\'existe pas',
				HttpStatus.BAD_REQUEST
			)
		}

		// Get the start and end date of the consumptions to load
		let bounds: { start: Date, end: Date } = null
		switch(type) {
			case 'DAY':
				bounds = { start: date, end: addDaysToDate(date, 1) }
				break
			case 'WEEK':
				const weekBounds = getDateWeekBounds(date)
				bounds = { start: weekBounds.start, end: addDaysToDate(weekBounds.end, 1) }
				break
			case 'MONTH':
				const monthBounds = getDateMonthBounds(date)
				bounds = { start: monthBounds.start, end: addDaysToDate(monthBounds.end, 1) }
				break
			default:
				bounds = null
		}

		// Load the consumption between these dates
		let userConsumptions = await this.getBetweenDates(
			usagePointId,
			bounds.start,
			bounds.end
		)

		const numberOfResultsExpected = getNumberOfDaysBetweenDates(
			bounds.start,
			bounds.end
		)

		const isAllDataLoaded = userConsumptions.length >= numberOfResultsExpected

		// If not all data is in our database, fetch consumption from Enedis DataHub API and
		// save it to our database
		if (!isAllDataLoaded) {
			const token = await this.usersService.refreshEnedisTokenIfNeeded(user)

			try {
				// Consumption data from all API calls
				let consumptionData = null
				// Number of days left to load
				let numberOfDaysLeft = numberOfResultsExpected
				// Last date loaded
				let lastDateLoaded = bounds.start

				// Enedis DataHub API allows to make request on a maximum of 7
				// days, so we fetch consumption by groups of 7 days
				while (numberOfDaysLeft > 0) {
					// Compute number of days to load
					const numberOfDaysToLoad = numberOfDaysLeft > 7 ? 7 : numberOfDaysLeft
					const endDate = addDaysToDate(lastDateLoaded, numberOfDaysToLoad)

					// Get data from Enedis DataHub API
					const data = await (await EnedisDataHubAPI.getDailyConsumption(
						usagePoint.enedisId,
						lastDateLoaded,
						endDate,
						token
					)).json()

					if (data.error) throw new Error()

					if (consumptionData === null) {
						consumptionData = data
					} else {
						// Append data to existing data
						consumptionData.meter_reading.interval_reading = [
							...consumptionData.meter_reading.interval_reading,
							...data.meter_reading.interval_reading
						]
					}

					// Compute number of days left to load
					lastDateLoaded = endDate
					numberOfDaysLeft -= numberOfDaysToLoad
				}

				userConsumptions = []
				// For each consumption data
				for (let interval of consumptionData.meter_reading.interval_reading) {
					// Try to get an already saved data
					let userConsumption = await this.repository.findOne({
						where: { date: interval.date }
					})

					// If not saved yet create a new one
					if (!userConsumption) {
						userConsumption = new UserConsumption()
						userConsumption.usagePoint = usagePoint
						userConsumption.date = new Date(interval.date)
						userConsumption.valueWatt = parseInt(interval.value)
						userConsumption = await this.repository.save(userConsumption)
					}

					// Remove usage point from results
					delete userConsumption.usagePoint
					userConsumptions.push(userConsumption)
				}
			} catch (error) {
				throw new HttpException(
					'Pas de données disponibles pour la période demandée',
					HttpStatus.BAD_REQUEST
				)
			}
		}

		return userConsumptions
	}

	/**
	 * Get the user consumptions repository.
	 * @returns The user consumptions repository.
	 */
	getRepository(): UserConsumptionsRepository {
		return this.repository
	}
}

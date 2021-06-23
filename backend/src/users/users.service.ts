import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersRepository } from './users.repository'
import { User } from './user.entity'
import { EnedisDataHubAPI } from 'src/services/EnedisDataHubAPI'
import { GetGraphDataDto } from 'src/dto/users.dto'
import { UsagePointsService } from 'src/usagePoints/usagePoints.service'
import { UserConsumptionsService } from './../userConsumptions/userConsumptions.service'
import { RegionConsumptionsService } from './../regionConsumptions/regionConsumptions.service'
import { UserConsumption } from './../userConsumptions/userConsumption.entity'
import { RegionConsumption } from './../regionConsumptions/regionConsumption.entity'
import { UsagePoint } from './../usagePoints/usagePoint.entity'
import { removeDaysFromDate } from './../utils/date.utils'
import { getDateMonthBounds } from 'src/utils/date.utils'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UsersRepository)
		private readonly repository: UsersRepository,
		private readonly usagePointsService: UsagePointsService,
		private readonly userConsumptionsService: UserConsumptionsService,
		private readonly regionConsumptionsService: RegionConsumptionsService
	) {}

	/**
	 * Get a valid Enedis access token. If current one is valid, return it. If
	 * not, get a new token and refresh token and update it in database.
	 * @param user The user for which to refresh the token.
	 * @returns A valid Enedis access token for this user.
	 */
	async refreshEnedisTokenIfNeeded(user: User): Promise<string> {
		const now = new Date()
		if (user.enedisApiTokenExpiresAt > now)
			return user.enedisApiToken

		const tokenData = await (
			await EnedisDataHubAPI.getCustomerTokenFromRefreshToken(
				user.enedisApiRefreshToken
			)
		).json()
		
		user.enedisApiToken = tokenData.access_token
		user.enedisApiRefreshToken = tokenData.refresh_token
		user.enedisApiTokenExpiresAt = new Date(
			parseInt(tokenData.issued_at) +
			parseInt(tokenData.expires_in)
		),

		await this.repository.save(user)

		return tokenData.access_token
	}

	/**
	 * Get a user by its id.
	 * @param id The id of the user.
	 * @returns The user with this id, or null if not found.
	 */
	async getById(id: number): Promise<User> {
		return await this.repository.findOneOrFail(id)
	}

	/**
	 * Get a user by its Enedis customer id.
	 * @param enedisId Enedis customer id of the user.
	 * @returns The user with this customer id, or null if not found.
	 */
	async getByEnedisId(enedisId: string): Promise<User> {
		return await this.repository.findOne({
			where: { enedisId }
		})
	}

	/**
	 * Get a user by its email.
	 * @param email The email of the user.
	 * @returns The user with this email, or null if not found.
	 */
	async getByEmail(email: string): Promise<User> {
		return await this.repository.findOne({
			where: { email }
		})
	}

	/**
	 * Get a user's password.
	 * @param user The user from which to get the password.
	 * @returns The user's password.
	 */
	async getUserPassword(user: User): Promise<string> {
		const { password } = await this.repository.findOne({
			select: ['password'],
			where: { id: user.id }
		})

		return password
	}

	async getUserFavoriteUsagePoint(user: User): Promise<UsagePoint> {
		return await this.usagePointsService.getRepository().findOne({
			user,
			isFavorite: true
		})
	}

	/**
	 * Create a user from non-formatted Enedis DataHub data.
	 * @param json The DataHub user data.
	 * @returns A promise on the the newly created user.
	 */
	async createFromDataHubJson(json: any): Promise<User> {
		// Get a user with the Enedis ID we are tring to use
		const user = await this.repository.findOne({
			where: { enedisId: json.customer_id }
		})

		// If the user already exists, throw exception
		if (user) {
			throw new HttpException(
				'Un utilisateur a déjà été créé avec ce compte Enedis',
				HttpStatus.BAD_REQUEST
			)
		}

		// Create the user
		return this.repository.createFromJson({
			enedisId: json.customer_id,
			title: json.identity.natural_person.title,
			firstname: json.identity.natural_person.firstname,
			lastname: json.identity.natural_person.lastname,
			email: json.contact_data.email,
			enedisApiToken: json.token_infos.access_token,
			enedisApiTokenExpiresAt: new Date(
				parseInt(json.token_infos.issued_at) +
				parseInt(json.token_infos.expires_in)
			),
			enedisApiRefreshToken: json.token_infos.refresh_token
		})
	}

	async getDataForGraph(
		user: User,
		getGraphDataDto: GetGraphDataDto
	): Promise<any> {
		const { period, graphs } = getGraphDataDto

		if (!['DAY', 'WEEK', 'MONTH'].includes(period)) {
			throw new HttpException(
				'Période demandée invalide',
				HttpStatus.BAD_REQUEST
			)
		}

		const date = await this.regionConsumptionsService.getLastDateLoaded()
		const data = []

		for (let graph of graphs) {
			let usagePoint: UsagePoint = null
			let consumption: (UserConsumption|RegionConsumption)[] = null

			if (graph === 'average') {
				usagePoint = await this.usagePointsService.getRepository().findOne({
					relations: ['region'],
					where: {
						user: user,
						isFavorite: true
					}
				})

				if (!usagePoint) continue
				
				consumption = await this.regionConsumptionsService.getRegionConsumption(
					usagePoint.region,
					usagePoint.subscribedPowerkVA,
					date,
					period
				)
			}
			else {
				const usagePointId = parseInt(graph.toString())
				usagePoint = await this.usagePointsService.getRepository().findOne({
					id: usagePointId,
					user: user
				})

				if (!usagePoint) continue

				consumption = await this.userConsumptionsService.getUserConsumptions(
					user,
					usagePoint.id,
					date,
					period
				)
			}

			consumption.forEach(consumption => {
				let timeData = data.find(timeData => timeData.time === consumption.date.toISOString())

				if (timeData) {
					timeData[graph] = consumption.valueWatt
				} else {
					timeData = { time : consumption.date.toISOString() }
					timeData[graph] = consumption.valueWatt
					data.push(timeData)
				}
			})
		}

		return data
	}

	async getDataForComparison(user: User): Promise<any> {
		const usagePoint = await this.getUserFavoriteUsagePoint(user)

		const currentDate = removeDaysFromDate(new Date(), 1)
		const previousDay = removeDaysFromDate(currentDate, 1)
		const previousWeek = removeDaysFromDate(currentDate, 7)
		const previousMonth = removeDaysFromDate(getDateMonthBounds(currentDate).start, 7)

		const data = {}
		const periods: ('DAY'|'WEEK'|'MONTH')[] = ['DAY', 'WEEK', 'MONTH']
		for (let period of periods) {
			let maxDateToAddToTotalValue = new Date(currentDate)

			if (period === 'WEEK') {
				maxDateToAddToTotalValue = new Date(previousWeek)
			}
			else if (period === 'MONTH') {
				maxDateToAddToTotalValue.setMonth(currentDate.getMonth() - 1)
			}

			maxDateToAddToTotalValue.setUTCHours(23)
			maxDateToAddToTotalValue.setUTCMinutes(59)
			maxDateToAddToTotalValue.setUTCSeconds(59)
			maxDateToAddToTotalValue.setUTCMilliseconds(999)

			const consumptionCurrent = await this.userConsumptionsService.getUserConsumptions(
				user,
				usagePoint.id,
				currentDate,
				period
			)

			let totalCurrent = 0
			consumptionCurrent.forEach(consumption => {
				totalCurrent += consumption.valueWatt
			})

			const consumptionPrevious = await this.userConsumptionsService.getUserConsumptions(
				user,
				usagePoint.id,
				period === 'DAY' ? previousDay : period === 'WEEK' ? previousWeek : previousMonth,
				period
			)

			let totalPrevious = 0
			consumptionPrevious.forEach(consumption => {
				if (consumption.date <= maxDateToAddToTotalValue) {
					totalPrevious += consumption.valueWatt
				}
			})

			const diff = totalCurrent - totalPrevious
			data[period] = {
				value: Math.abs(diff),
				trend: diff < 0 ? -1 : diff > 0 ? 1 : 0
			}
		}

		return data
	}

	/**
	 * Get the users repository.
	 * @returns The users repository.
	 */
	getRepository(): UsersRepository {
		return this.repository
	}
}

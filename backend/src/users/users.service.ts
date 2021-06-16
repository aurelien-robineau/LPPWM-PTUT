import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersRepository } from './users.repository'
import { User } from './user.entity'
import { EnedisDataHubAPI } from 'src/services/EnedisDataHubAPI'
import { addDaysToDate } from './../utils/date.utils'
import { UserConsumptionsService } from './../userConsumptions/userConsumptions.service'
import { UserConsumption } from './../userConsumptions/userConsumption.entity'
import { UsagePointsService } from './../usagePoints/usagePoints.service';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UsersRepository)
		private repository: UsersRepository,
		private userConsumptionsService: UserConsumptionsService,
		private usagePointsService: UsagePointsService
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

	/**
	 * Get the consumption of a user for a usage point and a day. If the
	 * consumption does not exists in our database, fetch it from the Enedis
	 * DataHub API and save it the our database.
	 * @param user The user for which to get the consumption.
	 * @param usagePointEnedisId The usage point Enedis ID from which to get the consumption.
	 * @param date The date of the day whe want the consumption for.
	 * @returns The consumptions for this user, usage point and day.
	 */
	async getComsumptionDataForDay(user: User, usagePointEnedisId: string, date: Date) {
		const usagePoint = await this.usagePointsService.getByEnedisId(usagePointEnedisId)

		if (!usagePoint) {
			throw new HttpException(
				'Le point d\'usage demandé n\'existe pas',
				HttpStatus.BAD_REQUEST
			)
		}

		// Get consumptions from our database
		let userConsumptions = await this.userConsumptionsService.getByDay(
			usagePoint.id,
			date
		)

		// If not in our database, fetch consumption from Enedis DataHub API and
		// save it to our database
		if (!userConsumptions.length) {
			const token = await this.refreshEnedisTokenIfNeeded(user)

			try {
				const consumptionData = await (await EnedisDataHubAPI.getConsumptionLoadCurve(
					usagePointEnedisId,
					date,
					addDaysToDate(date, 1),
					token
				)).json()

				userConsumptions = []
				for (let interval of consumptionData.meter_reading.interval_reading) {
					let userConsumption = new UserConsumption()
					userConsumption.usagePoint = usagePoint
					userConsumption.date = new Date(interval.date)
					userConsumption.valueWatt = interval.value
					userConsumption = await this.userConsumptionsService.getRepository().save(userConsumption)
					userConsumptions.push(userConsumption)
				}
			} catch (error) {
				throw new HttpException(
					'Pas de données pour les dates demandées',
					HttpStatus.BAD_REQUEST
				)
			}
		}

		return userConsumptions
	}

	/**
	 * Get the users repository.
	 * @returns The users repository.
	 */
	getRepository(): UsersRepository {
		return this.repository
	}
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersRepository } from './users.repository'
import { User } from './user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UsersRepository)
		private repository: UsersRepository,
	) {}

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
	async getByEnedisId(enedisId: number): Promise<User> {
		return await this.repository.findOne({
			where: { enedisId: enedisId.toString() }
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
			where: { enedisId: parseInt(json.customer_id) }
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
			enedisId: parseInt(json.customer_id),
			title: json.identity.natural_person.title,
			firstname: json.identity.natural_person.firstname,
			lastname: json.identity.natural_person.lastname,
			email: json.contact_data.email,
			enedisApiToken: json.token_infos.access_token,
			enedisApiTokenExpiresAt: new Date(
				parseInt(json.token_infos.issued_at) +
				parseInt(json.token_infos.expires_in) * 1000
			),
			enedisApiRefreshToken: json.token_infos.refresh_token
		})
	}

	/**
	 * Get the users repository.
	 * @returns The users repository.
	 */
	getRepository(): UsersRepository {
		return this.repository
	}
}

import { Injectable } from '@nestjs/common'
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
	 * @returns The user with this email, or null if not found
	 */
	async getByEmail(email: string): Promise<User> {
		return await this.repository.findOne({
			where: { email }
		})
	}
}

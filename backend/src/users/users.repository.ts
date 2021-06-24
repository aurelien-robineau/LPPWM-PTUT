import { Repository, EntityRepository } from "typeorm"
import { User } from './user.entity'

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
	/**
	 * Creates a new user from JSON data.
	 * @param json The user data as JSON.
	 * @returns The newly created user.
	 */
	createFromJson(json: any): User {
		const user = new User()
		user.enedisId = json.enedisId
		user.title = json.title
		user.firstname = json.firstname
		user.lastname = json.lastname
		user.email = json.email
		user.enedisApiToken = json.enedisApiToken
		user.enedisApiTokenExpiresAt = json.enedisApiTokenExpiresAt
		user.enedisApiRefreshToken = json.enedisApiRefreshToken

		return user
	}
}

import { Injectable } from '@nestjs/common'
import { compare } from 'bcryptjs'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/user.entity'
import { SignInDto } from 'src/dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService
	) {}

	/**
	 * Get a user by its identifier and password.
	 * @param signInDto Sign in DTO.
	 * @returns The user if authentication succeeds, else null.
	 */
	async signin(signInDto: SignInDto): Promise<User> {
		const { identifier, password } = signInDto

		let user: User = null

		// Try to parse identifier to int
		const enedisId = parseInt(identifier)

		// If parsing succeeds, then the identifier is an enedisId
		if (enedisId)
			user = await this.usersService.getByEnedisId(enedisId)
		// Else it is an email
		else
			user = await this.usersService.getByEmail(identifier)

		if (!user)
			return null

		const hash = await this.usersService.getUserPassword(user)
		if (!await compare(password, hash))
			return null

		return user
	}
}

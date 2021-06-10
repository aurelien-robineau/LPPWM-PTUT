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
		console.log(signInDto)

		let user: User = null
		try {
			const enedisId = parseInt(identifier)
			user = await this.usersService.getByEnedisId(enedisId)
		} catch (e) {
			user = await this.usersService.getByEmail(identifier)
		}

		if (!user || !await compare(password, user.password))
			return null

		return user
	}
}

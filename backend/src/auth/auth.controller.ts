import { Controller, Post, Body, SetMetadata, HttpException, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from '../dto/auth.dto'

@Controller('v1/auth')
export class AuthController {
	constructor(
		private service: AuthService
	) {}

	@Post('/signin')
	@SetMetadata('isPublic', true)
	async signin(@Body() signInDto: SignInDto): Promise<{ token: string }> {
		const user = await this.service.signin(signInDto)

		if (!user) {
			throw new HttpException(
				'Mot de passe ou identifiant invalide',
				HttpStatus.UNAUTHORIZED
			)
		}

		return { token: user.generateToken() }
	}
}

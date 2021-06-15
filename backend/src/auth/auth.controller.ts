import { Controller, Post, Body, SetMetadata, HttpException, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto, SignUpDto } from '../dto/auth.dto'
import { RefreshTokensService } from './../refreshTokens/refreshTokens.service'

@Controller('v1/auth')
export class AuthController {
	constructor(
		private readonly service: AuthService,
		private readonly refreshTokensService: RefreshTokensService
	) {}

	@Post('/enedis-authorization-url')
	@SetMetadata('isPublic', true)
	getEnedisAuthorizationUrl(): { url: string } {
		return { url: this.service.getEnedisAuthorizationUrl() }
	}

	@Post('/signin')
	@SetMetadata('isPublic', true)
	async signin(@Body() signInDto: SignInDto): Promise<{ token: string, refreshToken: string }> {
		const user = await this.service.signin(signInDto)

		if (!user) {
			throw new HttpException(
				'Mot de passe ou identifiant invalide',
				HttpStatus.UNAUTHORIZED
			)
		}

		return {
			token: user.generateToken(),
			refreshToken: await this.refreshTokensService.createNewRefreshTokenForUser(user.id)
		}
	}

	@Post('/signup')
	@SetMetadata('isPublic', true)
	async signup(@Body() signUpDto: SignUpDto): Promise<{ token: string, refreshToken: string }> {
		const user = await this.service.signup(signUpDto)

		if (!user) {
			throw new HttpException(
				'Le serveur a rencontré une erreur innatendue lors de la création de l\'utilisateur',
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}

		return {
			token: user.generateToken(),
			refreshToken: await this.refreshTokensService.createNewRefreshTokenForUser(user.id)
		}
	}
}

import { Controller, Body, Post, SetMetadata, HttpException, HttpStatus } from '@nestjs/common'
import { RefreshTokensService } from 'src/refreshTokens/refreshTokens.service'
import { UsersService } from './users.service'
import { GetGraphDataDto, GetNewTokenDto } from './../dto/users.dto'
import { GetUser } from './user.decorator'
import { User } from 'src/users/user.entity'

@Controller('v1/users')
export class UsersController {
	constructor(
		private readonly service: UsersService,
		private readonly refreshTokensService: RefreshTokensService
	) {}

	@Post('/token')
	@SetMetadata('isPublic', true)
	async getNewTokenPair(
		@Body() getNewTokenDto: GetNewTokenDto
	): Promise<{ token: string, refreshToken: string }> {
		const { refreshToken } = getNewTokenDto

		const { userId } = this.refreshTokensService.getTokenPayload(refreshToken)
		const user = await this.service.getById(userId)

		if (!user) {
			throw new HttpException(
				'Jeton de rafraîchissement invalide',
				HttpStatus.BAD_REQUEST
			)
		}

		return {
			token: user.generateToken(),
			refreshToken: await this.refreshTokensService.updateRefreshToken(refreshToken)
		}
	}

	@Post('/graph-data')
	async getDataForGraph(
		@GetUser() user: User,
		@Body() getGraphDataDto: GetGraphDataDto
	): Promise<any> {
		return await this.service.getDataForGraph(user, getGraphDataDto)
	}
}

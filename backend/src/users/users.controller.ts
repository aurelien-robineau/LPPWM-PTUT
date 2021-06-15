import { Controller, Body, Post } from '@nestjs/common'
import { RefreshTokensService } from 'src/refreshTokens/refreshTokens.service'
import { RequestUser } from './user.decorator'
import { UsersService } from './users.service'
import { User } from 'src/users/user.entity'
import { GetNewTokenDto } from './../dto/users.dto'

@Controller('v1/users')
export class UsersController {
	constructor(
		private readonly service: UsersService,
		private readonly refreshTokensService: RefreshTokensService
	) {}

	@Post('/token')
	async getNewTokenPair(
		@RequestUser() user: User,
		@Body() GetNewTokenDto: GetNewTokenDto
	): Promise<{ token: string, refreshToken: string }> {
		const { refreshToken } = GetNewTokenDto

		return {
			token: user.generateToken(),
			refreshToken: await this.refreshTokensService.updateRefreshToken(refreshToken)
		}
	}
}

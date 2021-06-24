import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { verify } from 'jsonwebtoken'
import { UsersService } from 'src/users/users.service'
import { RefreshTokensRepository } from './refreshTokens.repository'
import { RefreshToken } from './refreshToken.entity'
import config from 'src/config/config'

@Injectable()
export class RefreshTokensService {
	constructor(
		@InjectRepository(RefreshTokensRepository)
		private repository: RefreshTokensRepository,
		private readonly usersService: UsersService
	) {}

	/**
	 * Get the payload of a refresh token.
	 * @param token The token to get the payload from.
	 * @returns The payload of the token.
	 */
	getTokenPayload(token: string): { userId: number, tokenId: number } {
		try {
			return verify(token, config.refreshSecret) as {
				userId: number,
				tokenId: number
			}
		} catch (e) {
			return { userId: null, tokenId: null }
		}
	}

	/**
	 * Create a new refresh token for a user and store it in database.
	 * @param userId The id of the user for wich to create the token.
	 * @returns A new refresh token.
	 */
	async createNewRefreshTokenForUser(userId: number): Promise<string> {
		// Get user
		const user = await this.usersService.getById(userId)
		if (!user) return null

		// Create new token in database
		let refreshToken = new RefreshToken()
		refreshToken = await this.repository.save(refreshToken)

		// Generate refresh token and save it to database
		refreshToken.token = user.generateRefreshToken(refreshToken.id)
		refreshToken = await this.repository.save(refreshToken)

		return refreshToken.token
	}

	/**
	 * Generate a new refresh token and save it in database.
	 * @param refreskToken Refresh token to update.
	 * @returns A fresh refresh token.
	 */
	async updateRefreshToken(token: string): Promise<string> {
		try {
			const tokenPayload = verify(token, config.refreshSecret) as {
				userId: number,
				tokenId: number
			}

			let refreshToken = await this.repository.findOne({
				where: { token }
			})

			const user = await this.usersService.getById(tokenPayload.userId)

			if (!refreshToken || !user) throw new Error()


			refreshToken.token = user.generateRefreshToken(tokenPayload.tokenId)
			refreshToken = await this.repository.save(refreshToken)

			return refreshToken.token
		} catch (error) {
			throw new HttpException(
				'Le jeton de rafraîchissement est invalide',
				HttpStatus.BAD_REQUEST
			)
		}
	}
}

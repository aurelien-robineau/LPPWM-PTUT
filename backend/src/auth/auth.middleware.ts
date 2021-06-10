import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import { UsersService } from '../users/users.service'
import { verify } from 'jsonwebtoken'
import config from '../config'

/**
 * Fetch and add the user to the request object on each request.
 * The user id is provided by the bearer token in the Authorization header.
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(
		private readonly usersService: UsersService
	) {}

	/**
	 * Extract the authorization bearer token from a request.
	 * @param req The request from which to extract the token
	 * @returns The token or null if no token provided
	 */
	private getTokenFromRequest(req: Request): string|null {
		const authorization = req.get('authorization')
		return authorization
			? authorization.split(' ')[1] ?? null
			: null
	}

	async use(req: Request, res: Response, next: Function): Promise<void> {
		try {
			const token = this.getTokenFromRequest(req)
			if (token) {
				const userInfo = verify(token, config.secret) as { id: number }
				const user = await this.usersService.getById(userInfo.id);
				(req as any).user = user
			} else {
				(req as any).user = null
			}
		} catch (err) {
			(req as any).user = null
		}
		
		next()
	}
}
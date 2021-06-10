import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import { UsersService } from '../users/users.service'
import { verify } from 'jsonwebtoken'
import config from '../config'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(
		private readonly usersService: UsersService
	) {}

	private getTokenFromRequest(req: Request): string {
		const authorization = req.get('authorization')
		return authorization.split(' ')[1]
	}

	async use(req: Request, res: Response, next: Function) {
		try {
			const token = this.getTokenFromRequest(req)
			const userInfo = verify(token, config.secret) as { id: number }
			const user = await this.usersService.getById(userInfo.id);
			(req as any).user = user
		} catch (err) {
			(req as any).user = null
		}
		
		next()
	}
}
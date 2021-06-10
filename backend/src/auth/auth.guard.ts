import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector
	) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		// Get request infos		
		const request = context.switchToHttp().getRequest()
		const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler())

		// Access granted if route is public or user is authenticated
		const isAccessGranted = isPublic || !!request.user

		// Log request infos
		const now = new Date()
		console.log(`${now.toISOString()} ${request.route['stack'][0].method.toUpperCase()} ${request.originalUrl} ${isPublic ? 'Public' : 'Auth'} -> ${isAccessGranted ? 'OK' : 'UNAUTHORIZED'}`)

		if (isAccessGranted) return true

		throw new HttpException('Unauthorized', 403)
	}
}

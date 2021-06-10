import { Controller, Get, SetMetadata } from '@nestjs/common'
import { AppService } from './app.service'
import { AppStatus } from './app.types'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@SetMetadata('isPublic', true)
	getAppStatus(): AppStatus {
		return this.appService.getAppStatus()
	}
}

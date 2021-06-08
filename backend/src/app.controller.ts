import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { AppStatus } from './app.types'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getAppStatus(): AppStatus {
		return this.appService.getAppStatus()
	}
}

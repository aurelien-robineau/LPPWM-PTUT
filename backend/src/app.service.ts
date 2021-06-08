import { Injectable } from '@nestjs/common'
import { AppStatus } from './app.types'


@Injectable()
export class AppService {
	getAppStatus(): AppStatus {
		return {
			version: '1.0',
			status: 'live'
		}
	}
}

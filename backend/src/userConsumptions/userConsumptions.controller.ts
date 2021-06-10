import { Controller } from '@nestjs/common'
import { UserConsumptionsService } from './userConsumptions.service'

@Controller('v1/user-consumptions')
export class UserConsumptionsController {
	constructor(
		private readonly service: UserConsumptionsService
	) {}
}

import { Controller } from '@nestjs/common'
import { UsagePointsService } from './usagePoints.service'

@Controller('v1/usage-points')
export class UsagePointsController {
	constructor(
		private readonly service: UsagePointsService
	) {}
}

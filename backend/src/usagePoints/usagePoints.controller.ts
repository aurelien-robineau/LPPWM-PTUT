import { Controller, Post } from '@nestjs/common'
import { GetUser } from 'src/users/user.decorator'
import { UsagePointsService } from './usagePoints.service'
import { User } from './../users/user.entity'
import { UsagePoint } from './usagePoint.entity'

@Controller('v1/usage-points')
export class UsagePointsController {
	constructor(
		private readonly service: UsagePointsService
	) {}

	@Post('/')
	async getAllUsagePointsForUser(@GetUser() user: User): Promise<UsagePoint[]> {
		return await this.service.getAllForUser(user)
	}
}

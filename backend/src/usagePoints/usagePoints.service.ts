import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsagePointsRepository } from './usagePoints.repository'
import { UsagePoint } from './usagePoint.entity'

@Injectable()
export class UsagePointsService {
	constructor(
		@InjectRepository(UsagePointsRepository)
		private repository: UsagePointsRepository,
	) {}

	async getById(id: number): Promise<UsagePoint> {
		return await this.repository.findOneOrFail(id)
	}
}

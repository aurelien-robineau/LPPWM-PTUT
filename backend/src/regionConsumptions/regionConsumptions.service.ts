import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RegionConsumptionsRepository } from './regionConsumptions.repository'
import { RegionConsumption } from './regionConsumption.entity'

@Injectable()
export class RegionConsumptionsService {
	constructor(
		@InjectRepository(RegionConsumptionsRepository)
		private repository: RegionConsumptionsRepository,
	) {}

	async getById(id: number): Promise<RegionConsumption> {
		return await this.repository.findOneOrFail(id)
	}
}

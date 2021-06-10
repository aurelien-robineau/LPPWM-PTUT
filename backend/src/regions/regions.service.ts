import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RegionsRepository } from './regions.repository'
import { Region } from './region.entity'

@Injectable()
export class RegionsService {
	constructor(
		@InjectRepository(RegionsRepository)
		private repository: RegionsRepository,
	) {}

	async getById(id: number): Promise<Region> {
		return await this.repository.findOneOrFail(id)
	}
}

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserConsumptionsRepository } from './userConsumptions.repository'
import { UserConsumption } from './userConsumption.entity'

@Injectable()
export class UserConsumptionsService {
	constructor(
		@InjectRepository(UserConsumptionsRepository)
		private repository: UserConsumptionsRepository,
	) {}

	async getById(id: number): Promise<UserConsumption> {
		return await this.repository.findOneOrFail(id)
	}
}

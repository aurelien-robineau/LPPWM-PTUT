import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserConsumptionsRepository } from './userConsumptions.repository'
import { UserConsumption } from './userConsumption.entity'
import { getDayOnlyFromDate } from 'src/utils/date.utils'

@Injectable()
export class UserConsumptionsService {
	constructor(
		@InjectRepository(UserConsumptionsRepository)
		private repository: UserConsumptionsRepository,
	) {}

	/**
	 * Get a user consumption by its id.
	 * @param id The id of the user consumption.
	 * @returns The user consumption with this id.
	 */
	async getById(id: number): Promise<UserConsumption> {
		return await this.repository.findOneOrFail(id)
	}

	/**
	 * Get the user's consumption for a specific day.
	 * @param usagePointId The id if the usage point we want the consumption from.
	 * @param date The date of the day we want the consumption for.
	 * @returns The consumption for this day and this user.
	 */
	async getByDay(usagePointId: number, date: Date): Promise<UserConsumption[]> {
		return await this.repository.createQueryBuilder('USER_CONSUMPTION')
			.where('USER_CONSUMPTION.USAGE_POINT_ID = :usagePointId', { usagePointId })
			.andWhere(`USER_CONSUMPTION.DATE LIKE '${getDayOnlyFromDate(date)}%'`)
			.getMany()
	}

	/**
	 * Get the user consumptions repository.
	 * @returns The user consumptions repository.
	 */
	getRepository(): UserConsumptionsRepository {
		return this.repository
	}
}

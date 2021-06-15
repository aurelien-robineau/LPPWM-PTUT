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

	/**
	 * Get a usage point by its id.
	 * @param id The id of the usage point.
	 * @returns The usage point with this id.
	 */
	async getById(id: number): Promise<UsagePoint> {
		return await this.repository.findOneOrFail(id)
	}

	/**
	 * Create a usage point from non-formatted Enedis DataHub data.
	 * @param json The DataHub usage point data.
	 * @returns The newly created usage point.
	 */
	createFromDataHubJson(json: any): UsagePoint {
		return this.repository.createFromJson({
			enedisId: parseInt(json.usage_point.usage_point_id),
			type: json.usage_point.meter_type,
			subscribedPowerkVA: parseInt(json.contracts.subscribed_power.split(' ')[0]),
			street: json.usage_point.usage_point_addresses.street,
			locality: json.usage_point.usage_point_addresses.locality ?? null,
			postalCode: json.usage_point.usage_point_addresses.postal_code,
			city: json.usage_point.usage_point_addresses.city,
			country: json.usage_point.usage_point_addresses.country
		})
	}

	/**
	 * Get the usage points repository.
	 * @returns The usage points repository.
	 */
	getRepository(): UsagePointsRepository {
		return this.repository
	}
}

import { Repository, EntityRepository } from "typeorm"
import { UsagePoint } from './usagePoint.entity'

@EntityRepository(UsagePoint)
export class UsagePointsRepository extends Repository<UsagePoint> {
	/**
	 * Creates a new usage point from JSON data.
	 * @param json The usage point data as JSON.
	 * @returns The newly created usage point.
	 */
	createFromJson(json: any): UsagePoint {
		const usagePoint = new UsagePoint()
		usagePoint.enedisId = json.enedisId
		usagePoint.type = json.type
		usagePoint.subscribedPowerkVA = json.subscribedPowerkVA
		usagePoint.street = json.street
		usagePoint.locality = json.locality
		usagePoint.postalCode = json.postalCode
		usagePoint.city = json.city
		usagePoint.country = json.country

		return usagePoint
	}
}

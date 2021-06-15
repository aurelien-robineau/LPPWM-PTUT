import { Repository, EntityRepository } from "typeorm"
import { Region } from './region.entity'

@EntityRepository(Region)
export class RegionsRepository extends Repository<Region> {
	/**
	 * Creates a new region from JSON data.
	 * @param json The region data as JSON.
	 * @returns The newly created region.
	 */
	createFromJson(json: any): Region {
		const region = new Region()
		region.code = json.code
		region.name = json.name

		return region
	}
}

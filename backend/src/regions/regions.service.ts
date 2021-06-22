import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RegionsRepository } from './regions.repository'
import { Region } from './region.entity'
import { GouvGeoAPI } from 'src/services/GouvGeoAPI'

@Injectable()
export class RegionsService {
	constructor(
		@InjectRepository(RegionsRepository)
		private repository: RegionsRepository,
	) {}

	/**
	 * Get all the regions.
	 * @returns All the regions.
	 */
	async getAll(): Promise<Region[]> {
		return await this.repository.find()
	}

	/**
	 * Get a region by its id.
	 * @param id The id of the region.
	 * @returns The region with this id.
	 */
	async getById(id: number): Promise<Region> {
		return await this.repository.findOne(id)
	}

	/**
	 * Get a region by its code.
	 * @param code The code of the region.
	 * @returns The region with this code.
	 */
	async getByCode(code: number): Promise<Region> {
		return await this.repository.findOne({
			where: { code }
		})
	}

	/**
	 * Get a region by its code. If the region does not exists in database, get
	 * the region infos from the gouvernment Geo API and create it.
	 * @param code The code of the region.
	 * @returns The region with this code.
	 */
	async getByCodeOrCreate(code: number): Promise<Region> {
		let region = await this.getByCode(code)

		if (!region) {
			const response = await GouvGeoAPI.getRegionByCode(code)
			const regionInfos = await response.json()

			region = this.repository.createFromJson({
				code: regionInfos.code,
				name: regionInfos.nom
			})
		}

		return region
	}

	/**
	 * Get the regions repository.
	 * @returns The regions repository.
	 */
	getRepository(): RegionsRepository {
		return this.repository
	}
}

import fetch, { Response } from 'node-fetch'
import config from 'src/config/config'

/**
 * A set of methods to use the government Geo API.
 */
export const GouvGeoAPI = {
	/**
	 * Get the region data by its code.
	 * @param code The code of the region.
	 * @returns The region data.
	 */
	getRegionByCode: async (code: number): Promise<Response> => {
		return fetch(`${config.gouv.apigeo.baseUrl}/regions/${code}`)
	},

	/**
	 * Get the region data of a city by its code.
	 * @param cityCode The code of the city.
	 * @returns The region data if the city.
	 */
	getRegionByCityCode: async (cityCode: string): Promise<Response> => {
		const cityUrl =
			`${config.gouv.apigeo.baseUrl}/communes` +
			`/${cityCode}`

		const city = await (await fetch(cityUrl)).json()

		return fetch(`${config.gouv.apigeo.baseUrl}/regions/${city.codeRegion}`)
	}
}
import fetch, { Response } from 'node-fetch'
import config from 'src/config/config'
import { Region } from 'src/regions/region.entity'
import { getDayOnlyFromDate } from 'src/utils/date.utils';

/**
 * A set of methods to use the Enedis OpenData API.
 */
export const EnedisOpenDataAPI = {
	consumptionRanges: {
		'P1: ]0-3] kVA': 3,
		'P2: ]3-6] kVA': 6,
		'P3: ]6-9] kVA': 9,
		'P4: ]9-12] kVA': 12,
		'P5: ]12-15] kVA': 15,
		'P6: ]15-18] kVA': 18,
		'P7: ]18-24] kVA': 24,
		'P8: ]24-30] kVA': 30,
		'P9: ]30-36] kVA': 36
	},

	getGlobalConsumptionForRegion: async (
		region: Region,
		yearMonthDay: string,
		take: number,
		skip: number,
		dataset: string
	): Promise<Response> => {
		const url = new URL(
			`${config.enedis.opendata.baseUrl}/api/records/1.0/search/` +
			`?dataset=${dataset}` +
			`&rows=${take}` +
			`&start=${skip}` +
			`&sort=horodate` +
			`&facet=horodate` +
			`&facet=region` +
			`&facet=profil` +
			`&facet=plage_de_puissance_souscrite` +
			`&refine.horodate=${yearMonthDay}` +
			`&refine.code_region=${region.code}`
		)
		
		return fetch(url.href)
	},

	isDataOnlineForDate: async (date: Date, dataset: string): Promise<boolean> => {
		const url = new URL(
			`${config.enedis.opendata.baseUrl}/api/records/1.0/search/` +
			`?dataset=${dataset}` +
			`&q=` +
			`&rows=1` +
			`&refine.horodate=${getDayOnlyFromDate(date).replace(/-/g, '/')}`
		)
		console.log(url.href)
		const data = await (await fetch(url.href)).json()

		return data.records.length !== 0
	}
}
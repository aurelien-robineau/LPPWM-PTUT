import fetch, { Response } from 'node-fetch'
import config from 'src/config/config'
import { getDayOnlyFromDate } from 'src/utils/date.utils'

/**
 * A set of methods to use the Enedis DataHub API.
 */
export const EnedisDataHubAPI = {
	/**
	 * Get the customer's token data from its authorization code.
	 * @param authorizationCode The user's authorization code.
	 * @returns The customer's token data.
	 */
	getCustomerTokenFromCode: async (authorizationCode: string): Promise<Response> => {
		const url =
			`${config.enedis.datahub.baseUrl}/v1/oauth2/token` +
			`?redirect_uri=${config.enedis.datahub.redirectUri}`
		
		return fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body:
				`grant_type=authorization_code` +
				`&client_id=${config.enedis.datahub.publicKey}` +
				`&client_secret=${config.enedis.datahub.privateKey}` +
				`&code=${authorizationCode}`
		})
	},

	/**
	 * Get the customer's token data from its refresh token.
	 * @param refreshToken The user's refresh token.
	 * @returns The customer's token data.
	 */
	getCustomerTokenFromRefreshToken: async (refreshToken: string): Promise<Response> => {
		const url =
			`${config.enedis.datahub.baseUrl}/v1/oauth2/token` +
			`?redirect_uri=${config.enedis.datahub.redirectUri}`
		
		return fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body:
				`grant_type=refresh_token` +
				`&client_id=${config.enedis.datahub.publicKey}` +
				`&client_secret=${config.enedis.datahub.privateKey}` +
				`&refresh_token=${refreshToken}`
		})
	},

	/**
	 * Get the customer's identity.
	 * @param usagePointEnedisId The usage point's Enedis ID of the customer we want the
	 * data from.
	 * @param customerToken The customer's Enedis access token.
	 * @returns The user identity data.
	 */
	getCustomerIdentity: async (
		usagePointEnedisId: string,
		customerToken: string
	): Promise<Response> => {
		return EnedisDataHubAPI._fetchFromCustomerAPI(
			usagePointEnedisId,
			customerToken,
			'/identity'
		)
	},

	/**
	 * Get the customer's contact data.
	 * @param usagePointEnedisId The usage point's Enedis ID of the customer we want the
	 * data from.
	 * @param customerToken The customer's Enedis access token.
	 * @returns The user contact data.
	 */
	getCustomerContactData: async (
		usagePointEnedisId: string,
		customerToken: string
	): Promise<Response> => {
		return EnedisDataHubAPI._fetchFromCustomerAPI(
			usagePointEnedisId,
			customerToken,
			'/contact_data'
		)
	},

	/**
	 * Get the usage point's contract data.
	 * @param usagePointEnedisId The usage point's Enedis ID.
	 * @param customerToken The customer's Enedis access token.
	 * @returns The usage point's contract data.
	 */
	getUsagePointContract: async (
		usagePointEnedisId: string,
		customerToken: string
	): Promise<Response> => {
		return EnedisDataHubAPI._fetchFromCustomerAPI(
			usagePointEnedisId,
			customerToken,
			'/usage_points/contracts'
		)
	},

	/**
	 * Get the usage point's address data.
	 * @param usagePointEnedisId The usage point's Enedis ID.
	 * @param customerToken The customer's Enedis access token.
	 * @returns The usage point's address data.
	 */
	getUsagePointAddress: async (
		usagePointEnedisId: string,
		customerToken: string
	): Promise<Response> => {
		return EnedisDataHubAPI._fetchFromCustomerAPI(
			usagePointEnedisId,
			customerToken,
			'/usage_points/addresses'
		)
	},

	/**
	 * Get the consumption curve data for a usage point between to dates.
	 * @param usagePointEnedisId The usage point's Enedis ID.
	 * @param start The first day of the interval to load.
	 * @param end The last day of the interval to load.
	 * @param customerToken The customer's Enedis access token
	 * @returns The consumption curve data.
	 */
	getConsumptionLoadCurve: async (
		usagePointEnedisId: string,
		start: Date,
		end: Date,
		customerToken: string
	): Promise<Response> => {
		return EnedisDataHubAPI._fetchFromMeteringAPI(
			usagePointEnedisId,
			start,
			end,
			customerToken,
			'/consumption_load_curve'
		)
	},

	/**
	 * Get the production curve data for a usage point between to dates.
	 * @param usagePointEnedisId The usage point's Enedis ID.
	 * @param start The first day of the interval to load.
	 * @param end The last day of the interval to load.
	 * @param customerToken The customer's Enedis access token
	 * @returns The production curve data.
	 */
	getProductionLoadCurve: async (
		usagePointEnedisId: string,
		start: Date,
		end: Date,
		customerToken: string
	): Promise<Response> => {
		return EnedisDataHubAPI._fetchFromMeteringAPI(
			usagePointEnedisId,
			start,
			end,
			customerToken,
			'/production_load_curve'
		)
	},

	/**
	 * Get the contract data for a specific usage point.
	 * @param response The Enedis DataHub API response.
	 * @param usagePointEnedisId The usage point's Enedis ID to select.
	 * @returns The contract data for this usage point.
	 */
	extractContractDataFromResponse: async (
		response: Response,
		usagePointEnedisId: string
	): Promise<any> => {
		return (await response.json()).customer.usage_points.find((data: any) =>
			data.usage_point.usage_point_id === usagePointEnedisId
		)
	},

	/**
	 * Get the address data for a specific usage point.
	 * @param response The Enedis DataHub API response.
	 * @param usagePointEnedisId The usage point's Enedis ID to select.
	 * @returns The address data for this usage point.
	 */
	extractAddressDataFromResponse: async (
		response: Response,
		usagePointEnedisId: string
	): Promise<any> => {
		return (await response.json()).customer.usage_points.find((data: any) =>
			data.usage_point.usage_point_id === usagePointEnedisId
		)
	},

	/**
	 * Make an Enedis DataHub Customer API call.
	 * @param usagePointEnedisId The usage point's Enedis ID to get the data from.
	 * @param customerToken The customer's Enedis access token.
	 * @param endpoint The path of the endpoint to call.
	 * @returns A promise of an API response.
	 */
	_fetchFromCustomerAPI: async (
		usagePointEnedisId: string,
		customerToken: string,
		endpoint: string
	): Promise<Response> => {
		const url =
			`${config.enedis.datahub.baseUrl}/v3/customers${endpoint}` +
			`?usage_point_id=${usagePointEnedisId}`

		return fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${customerToken}`,
				Accept: 'application/json'
			}
		})
	},

	/**
	 * Make an Enedis DataHub Metering API call.
	 * @param usagePointEnedisId The usage point's Enedis ID to get the data from.
	 * @param start The first day of the interval to load.
	 * @param end The last day of the interval to load.
	 * @param customerToken The customer's Enedis access token.
	 * @param endpoint The path of the endpoint to call.
	 * @returns A promise of an API response.
	 */
	_fetchFromMeteringAPI: async (
		usagePointEnedisId: string,
		start: Date,
		end: Date,
		customerToken: string,
		endpoint: string
	): Promise<Response> => {
		const url =
			`${config.enedis.datahub.baseUrl}/v4/metering_data${endpoint}` +
			`?usage_point_id=${usagePointEnedisId}` +
			`&start=${getDayOnlyFromDate(start)}` +
			`&end=${getDayOnlyFromDate(end)}`

		console.log(url)

		return fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${customerToken}`,
				Accept: 'application/json'
			}
		})
	}
}
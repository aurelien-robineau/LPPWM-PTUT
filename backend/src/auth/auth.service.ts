import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/user.entity'
import { SignInDto, SignUpDto } from 'src/dto/auth.dto'
import config from 'src/config/config'
import { EnedisDataHubAPI } from 'src/services/EnedisDataHubAPI'
import { GouvGeoAPI } from './../services/GouvGeoAPI'
import { RegionsService } from './../regions/regions.service'
import { UsagePointsService } from './../usagePoints/usagePoints.service'
import { UsagePoint } from './../usagePoints/usagePoint.entity'
import { Region } from 'src/regions/region.entity'
const bcrypt = require('bcryptjs')

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private usagePointsService: UsagePointsService,
		private regionsService: RegionsService
	) {}

	/**
	 * Get the Enedis authorization URL for authenticating Enedis customer and
	 * gt their consent to use their data.
	 * @returns The Enedis authorization URL.
	 */
	getEnedisAuthorizationUrl(): string {
		return (
			`${config.enedis.datahub.authorizeBaseUrl}/dataconnect/v1/oauth2/authorize` +
			`?client_id=${config.enedis.datahub.publicKey}` +
			`&response_type=code` +
			`&duration=${config.enedis.datahub.authorizationDuration}`
		)
	}

	/**
	 * Get a user by its identifier and password.
	 * @param signInDto Sign in DTO.
	 * @returns The user if authentication succeeds, else `null`.
	 */
	async signin(signInDto: SignInDto): Promise<User> {
		const { identifier, password } = signInDto

		let user: User = null

		// Try to parse identifier to int
		const enedisId = parseInt(identifier)

		// If parsing succeeds, then the identifier is an enedisId
		if (enedisId)
			user = await this.usersService.getByEnedisId(identifier)
		// Else it is an email
		else
			user = await this.usersService.getByEmail(identifier)

		if (!user)
			return null

		const hash = await this.usersService.getUserPassword(user)
		if (!bcrypt.compareSync(password, hash))
			return null

		return user
	}

	/**
	 * Create a new user. The user's data is loaded from the Enedis DataHub API.
	 * @param signUpDto Sign up DTO.
	 * @returns The newly created user if signup succeeded, else `null`.
	 */
	async signup(signUpDto: SignUpDto): Promise<User> {
		const { authorizationCode, password } = signUpDto

		try {
			// Create user from DataHub API
			const customerData = await this._getUserDataForSignUp(authorizationCode)
			let user = await this.usersService.createFromDataHubJson(customerData)
			user.password = bcrypt.hashSync(password)

			const usagePointsIds = customerData.token_infos.usage_points_id.split(',')
			const usagePointsRegions: { usagePoint: UsagePoint, region: Region }[] = []

			// Create all user's usage points
			for (let usagePointId of usagePointsIds) {
				// Create usage point from DataHub API
				const usagePointData = await this._getUsagePointDataForSignUp(
					usagePointId,
					customerData.token_infos.access_token
				)

				const usagePoint = this.usagePointsService.createFromDataHubJson(
					usagePointData
				)

				// Get the region from database or create it if not yet in database
				const region = await this.regionsService
					.getByCodeOrCreate(usagePointData.regionInfos.code)

				// Save usage points and regions to write in database
				usagePointsRegions.push({
					usagePoint: usagePoint,
					region: region
				})
			}

			// Save user
			user = await this.usersService.getRepository().save(user)

			// Save usage points and regions
			for (let usagePoint of usagePointsRegions) {
				const region = await this.regionsService.getRepository()
					.save(usagePoint.region)

				usagePoint.usagePoint.region = region
				usagePoint.usagePoint.user = user
				await this.usagePointsService.getRepository()
					.save(usagePoint.usagePoint)
			}

			return user
		} catch (error) {
			if (error.status === 400)
				throw error
			console.log(error)
			return null
		}
	}

	/**
	 * Get all the needed customer data from the Enedis DataHub API.
	 * @param authorizationCode The Enedis authorization code to get customer data.
	 * @returns The customer data.
	 */
	async _getUserDataForSignUp(authorizationCode: string): Promise<any> {
		// Get the authorization token and its infos
		const tokenInfos = await (
			await EnedisDataHubAPI.getCustomerTokenFromCode(authorizationCode)
		).json()

		// Throw error if code is invalid
		if (tokenInfos.error) {
			throw new HttpException(
				'Le code d\'autorisation Enedis n\'existe pas, a expiré ou a déjà été utilisé',
				HttpStatus.BAD_REQUEST
			)
		}

		const usagePointsId = tokenInfos.usage_points_id.split(',')

		// Get customer identity infos
		const customerIdentity = await (
			await EnedisDataHubAPI.getCustomerIdentity(
				usagePointsId[0],
				tokenInfos.access_token
			)
		).json()

		// Get customer contact data
		const customerContactData = await (
			await EnedisDataHubAPI.getCustomerContactData(
				usagePointsId[0],
				tokenInfos.access_token
			)
		).json()

		return {
			...customerIdentity,
			...customerContactData,
			token_infos: tokenInfos
		}
	}

	/**
	 * Get all the needed usage point data from the Enedis DataHub API
	 * @param usagePointId The Enedis ID if the usage point
	 * @param accessToken The user's Enedis API access token
	 * @returns The usage point data
	 */
	async _getUsagePointDataForSignUp(
		usagePointId: string,
		accessToken: string
	): Promise<any> {
		// Get the usage point's contract details
		let response = await EnedisDataHubAPI.getUsagePointContract(
			usagePointId,
			accessToken
		)
		const usagePointContract = await EnedisDataHubAPI
			.extractContractDataFromResponse(
				response,
				usagePointId
			)

		// Get the usage point's address details
		response = await EnedisDataHubAPI.getUsagePointAddress(
			usagePointId,
			accessToken
		)
		const usagePointAddress = await EnedisDataHubAPI
			.extractAddressDataFromResponse(
				response,
				usagePointId
			)

		// Get the region of the usage point
		const usagePointRegionInfos = await (
			await GouvGeoAPI.getRegionByCityCode(
				usagePointAddress
					.usage_point
					.usage_point_addresses
					.insee_code
			)
		).json()
		
		return {
			...usagePointContract,
			...usagePointAddress,
			regionInfos: usagePointRegionInfos
		}
	}
}

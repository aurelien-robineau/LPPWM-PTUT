import { IsNotEmpty } from 'class-validator'

export class GetNewTokenDto {
	/**
	 * The user's refresh token.
	 */
	@IsNotEmpty({ message: 'Le jeton de rafraîchissement est obligatoire' })
	refreshToken: string
}

export class GetGraphDataDto {
	/**
	 * The period we want the data from.
	 */
	@IsNotEmpty({ message: 'La période est obligatoire' })
	period: 'DAY' | 'WEEK' | 'MONTH'

	/**
	 * The ids of the usage points to load, or 'average' for the region average.
	 */
	@IsNotEmpty({ message: 'Les graphiques voulus sont obligatoires' })
	graphs: (string|number)[]
}

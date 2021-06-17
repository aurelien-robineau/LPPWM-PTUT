import { IsNotEmpty } from 'class-validator'

export class GetNewTokenDto {
	/**
	 * The user's refresh token.
	 */
	@IsNotEmpty({ message: 'Le jeton de rafraîchissement est obligatoire' })
	refreshToken: string
}

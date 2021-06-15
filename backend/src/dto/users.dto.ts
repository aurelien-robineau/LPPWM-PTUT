import { IsNotEmpty } from 'class-validator'

export class GetNewTokenDto {
	@IsNotEmpty({ message: 'Le jeton de rafraîchissement est obligatoire' })
	refreshToken: string
}
import { MaxLength, IsNotEmpty } from 'class-validator'

export class SignInDto {
	/**
	 * The Enedis customer id or the email of the user.
	 */
	@IsNotEmpty({ message: 'L\'identifiant est obligatoire' })
	identifier: string

	/**
	 * The password of the user for this app.
	 */
	@IsNotEmpty({ message: 'Le mot de passe est obligatoire' })
	password: string
}
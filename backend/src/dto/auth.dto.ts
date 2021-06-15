import { IsNotEmpty, Matches } from 'class-validator'

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

export class SignUpDto {
	/**
	 * The Enedis authorization code provided when the customer gives its consent.
	 * The code is used to get an Enedis API token for this customer.
	 */
	@IsNotEmpty({ message: 'Le code d\'autorisation Enedis est obligatoire' })
	authorizationCode: string

	/**
	 * The password of the user for this app.
	 * The password must be at least 8 characters long and contain lowercase and
	 * uppercase letters and numbers.
	 */
	@Matches(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/, {
		message: 'Le mot de passe doit contenir au moins 8 caractères dont une miniscule, une majuscule et un chiffre'
	})
	@IsNotEmpty({ message: 'Le mot de passe est obligatoire' })
	password: string
}
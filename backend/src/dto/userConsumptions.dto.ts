import { IsInt, IsNotEmpty, Matches} from 'class-validator'

export class GetDayConsumptionDto {
	/**
	 * The usage point's id from which we want the data from.
	 */
	@IsNotEmpty({ message: 'L\'identifiant du point d\'usage est obligatoire' })
	@IsInt({ message : 'L\'identifiant doit être un nombre entier' })
	usagePointId: number

	/**
	 * The date as an ISO string of the day we want the data from.
	 */
	@IsNotEmpty({ message: 'La date du jour demandé est obligatoire' })
	@Matches(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/, {
		message: 'La date doit avoir le format ISO'
	})
	date: string
}
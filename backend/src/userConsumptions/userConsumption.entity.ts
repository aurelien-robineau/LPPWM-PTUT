import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './../users/user.entity';

@Entity({ name: 'USER_CONSUMPTIONS' })
export class UserConsumption {
	@PrimaryGeneratedColumn({ name: 'ID' })
	id: number

	@ManyToOne(() => User, user => user.consumptions)
	@JoinColumn({ name: 'USER_ID' })
	user: User
	
	@Column({
		name: 'DATE',
		type: 'datetime'
	})
	date: Date

	@Column({
		name: 'VALUE_WATT',
		type: 'int',
		width: 11
	})
	valueWatt: number
}
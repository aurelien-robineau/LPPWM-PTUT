import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { UsagePoint } from './../usagePoints/usagePoint.entity';

@Entity({ name: 'USER_CONSUMPTIONS' })
export class UserConsumption {
	@PrimaryGeneratedColumn({ name: 'ID' })
	id: number

	@ManyToOne(() => UsagePoint, usagePoint => usagePoint.consumptions)
	@JoinColumn({ name: 'USAGE_POINT_ID' })
	usagePoint: UsagePoint
	
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
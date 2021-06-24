import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Region } from './../regions/region.entity';

@Entity({ name: 'REGION_CONSUMPTIONS' })
export class RegionConsumption {
	@PrimaryGeneratedColumn({ name: 'ID' })
	id: number

	@ManyToOne(() => Region, region => region.consumptions)
	@JoinColumn({ name: 'REGION_ID' })
	region: Region
	
	@Column({
		name: 'DATE',
		type: 'datetime'
	})
	date: Date

	@Column({
		name: 'SUBSCRIBED_POWER_kVA',
		type: 'int',
		width: 11
	})
	subscribedPowerkVA: number

	@Column({
		name: 'VALUE_WATT',
		type: 'int',
		width: 11
	})
	valueWatt: number
}
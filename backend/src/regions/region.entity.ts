import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { UsagePoint } from './../usagePoints/usagePoint.entity';
import { RegionConsumption } from './../regionConsumptions/regionConsumption.entity';

@Entity({ name: 'REGIONS' })
export class Region {
	@PrimaryGeneratedColumn({ name: 'ID' })
	id: number

	@Column({
		name: 'CODE',
		type: 'varchar',
		length: 2,
		unique: true
	})
	code: string

	@Column({
		name: 'NAME',
		type: 'varchar',
		length: 255
	})
	name: string

	@OneToMany(() => UsagePoint, usagePoint => usagePoint.region, {
		cascade: true,
		onDelete: 'CASCADE'
	})
	usagePoints: UsagePoint[]

	@OneToMany(() => RegionConsumption, regionConsumption => regionConsumption.region, {
		cascade: true,
		onDelete: 'CASCADE'
	})
	consumptions: RegionConsumption[]
}
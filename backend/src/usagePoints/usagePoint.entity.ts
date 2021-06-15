import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { User } from './../users/user.entity'
import { Region } from './../regions/region.entity'
import { UserConsumption } from './../userConsumptions/userConsumption.entity';

@Entity({ name: 'USAGE_POINTS' })
export class UsagePoint {
	@PrimaryGeneratedColumn({ name: 'ID' })
	id: number

	@Column({
		name: 'ENEDIS_ID',
		type: 'int',
		width: 11,
		unique: true
	})
	enedisId: number

	@ManyToOne(() => User, user => user.usagePoints)
	@JoinColumn({ name: 'USER_ID' })
	user: User

	@ManyToOne(() => Region, region => region.usagePoints)
	@JoinColumn({ name: 'REGION_ID' })
	region: Region

	@Column({
		name: 'TYPE',
		type: 'varchar',
		length: 255
	})
	type: string

	@Column({
		name: 'SUBSCRIBED_POWER_kVA',
		type: 'int',
		width: 11
	})
	subscribedPowerkVA: number

	@Column({
		name: 'STREET',
		type: 'varchar',
		length: 255
	})
	street: string

	@Column({
		name: 'LOCALITY',
		type: 'varchar',
		length: 255,
		nullable: true
	})
	locality: string

	@Column({
		name: 'POSTAL_CODE',
		type: 'varchar',
		length: 5
	})
	postalCode: string

	@Column({
		name: 'CITY',
		type: 'varchar',
		length: 255
	})
	city: string

	@Column({
		name: 'COUNTRY',
		type: 'varchar',
		length: 255
	})
	country: string

	@OneToMany(() => UserConsumption, userConsumption => userConsumption.usagePoint, {
		onDelete: 'CASCADE'
	})
	consumptions: UserConsumption[]
}
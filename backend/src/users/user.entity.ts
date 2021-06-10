import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { sign } from 'jsonwebtoken'
import { UsagePoint } from './../usagePoints/usagePoint.entity'
import { UserConsumption } from './../userConsumptions/userConsumption.entity'
import config from 'src/config'

@Entity({ name: 'USERS' })
export class User {
	@PrimaryGeneratedColumn({ name: 'ID' })
	id: number

	@Column({
		name: 'ENEDIS_ID',
		type: 'int',
		width: 11,
		unique: true
	})
	enedisId: number

	@Column({
		name: 'TITLE',
		type: 'varchar',
		length: 4
	})
	title: string

	@Column({
		name: 'FIRSTNAME',
		type: 'varchar',
		length: 255
	})
	firstname: string

	@Column({
		name: 'LASTNAME',
		type: 'varchar',
		length: 255
	})
	lastname: string

	@Column({
		name: 'EMAIL',
		type: 'varchar',
		length: 255,
		unique: true
	})
	email: string

	@Column({
		name: 'PASSWORD',
		type: 'varchar',
		length: 255,
		select: false
	})
	password: string

	@Column({
		name: 'ENEDIS_API_TOKEN',
		type: 'varchar',
		length: 255
	})
	enedisApiToken: string

	@UpdateDateColumn({ name: 'UPDATED_AT' })
	updatedAt: Date

	@CreateDateColumn({ name: 'CREATED_AT' })
	createdAt: Date

	@OneToMany(() => UsagePoint, usagePoint => usagePoint.user, {
		cascade: true,
		onDelete: 'CASCADE'
	})
	usagePoints: UsagePoint[]

	@OneToMany(() => UserConsumption, userConsumption => userConsumption.user, {
		cascade: true,
		onDelete: 'CASCADE'
	})
	consumptions: UserConsumption[]

	/**
	 * Generate an API access token for the user.
	 * @returns The user's token.
	 */
	public generateToken(): string {
		const tokenData = {
			id: this.id,
			title: this.title,
			firstname: this.firstname,
			lastname: this.lastname,
			email: this.email,
			updatedAt: this.updatedAt,
			createdAt: this.createdAt
		}
		
		const token = sign(tokenData, config.secret, {
			expiresIn: '1h'
		})

		return token
	}

}
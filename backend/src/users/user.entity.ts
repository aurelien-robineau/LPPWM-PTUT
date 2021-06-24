import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { sign } from 'jsonwebtoken'
import { UsagePoint } from './../usagePoints/usagePoint.entity'
import config from 'src/config/config'

@Entity({ name: 'USERS' })
export class User {
	@PrimaryGeneratedColumn({ name: 'ID' })
	id: number

	@Column({
		name: 'ENEDIS_ID',
		type: 'varchar',
		width: 255,
		unique: true
	})
	enedisId: string

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
		name: 'WEEK_GOAL_WATT',
		type: 'int',
		width: 11,
		nullable: true
	})
	weekGoalWatt: number

	@Column({
		name: 'ENEDIS_API_TOKEN',
		type: 'varchar',
		length: 255
	})
	enedisApiToken: string

	@Column({ name: 'ENEDIS_API_TOKEN_EXPIRES_AT' })
	enedisApiTokenExpiresAt: Date

	@Column({
		name: 'ENEDIS_API_REFRESH_TOKEN',
		type: 'varchar',
		length: 255
	})
	enedisApiRefreshToken: string

	@UpdateDateColumn({ name: 'UPDATED_AT' })
	updatedAt: Date

	@CreateDateColumn({ name: 'CREATED_AT' })
	createdAt: Date

	@OneToMany(() => UsagePoint, usagePoint => usagePoint.user, {
		onDelete: 'CASCADE'
	})
	usagePoints: UsagePoint[]

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
			weekGoalWatt: this.weekGoalWatt,
			updatedAt: this.updatedAt,
			createdAt: this.createdAt
		}
		
		const token = sign(tokenData, config.secret, {
			expiresIn: '1h'
		})

		return token
	}

	/**
	 * Generate an API refresh token for the user.
	 * @returns The user's refresh token.
	 */
	public generateRefreshToken(id: number): string {
		const tokenData = {
			userId: this.id,
			tokenId: id
		}
		
		const token = sign(tokenData, config.refreshSecret, {
			expiresIn: '1y'
		})

		return token
	}
}
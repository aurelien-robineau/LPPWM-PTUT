import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'REFRESH_TOKENS' })
export class RefreshToken {
	@PrimaryGeneratedColumn({ name: 'ID' })
	id: number

	@Column({
		name: 'TOKEN',
		type: 'varchar',
		length: 255,
		nullable: true
	})
	token: string
}
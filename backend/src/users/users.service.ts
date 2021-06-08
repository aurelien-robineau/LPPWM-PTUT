import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UsersRepository)
		private repository: UsersRepository,
	) {}
}

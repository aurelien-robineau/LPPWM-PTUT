import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'
import { RefreshTokensModule } from './../refreshTokens/refreshTokens.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([UsersRepository]),
		forwardRef(() => RefreshTokensModule)
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}

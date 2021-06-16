import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'
import { RefreshTokensModule } from './../refreshTokens/refreshTokens.module'
import { UserConsumptionsModule } from './../userConsumptions/userConsumptions.module'
import { UsagePointsModule } from './../usagePoints/usagePoints.module'

@Module({
	imports: [
	TypeOrmModule.forFeature([UsersRepository]),
		forwardRef(() => RefreshTokensModule),
		UserConsumptionsModule,
		UsagePointsModule
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}

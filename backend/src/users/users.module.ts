import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'
import { RefreshTokensModule } from './../refreshTokens/refreshTokens.module'
import { UsagePointsModule } from 'src/usagePoints/usagePoints.module'
import { UserConsumptionsModule } from './../userConsumptions/userConsumptions.module'
import { RegionConsumptionsModule } from './../regionConsumptions/regionConsumptions.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([UsersRepository]),
		forwardRef(() => RefreshTokensModule),
		forwardRef(() => UserConsumptionsModule),
		UsagePointsModule,
		RegionConsumptionsModule
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}

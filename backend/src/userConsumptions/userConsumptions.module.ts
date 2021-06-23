import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserConsumptionsController } from './userConsumptions.controller'
import { UserConsumptionsRepository } from './userConsumptions.repository'
import { UserConsumptionsService } from './userConsumptions.service'
import { UsagePointsModule } from 'src/usagePoints/usagePoints.module'
import { UsersModule } from './../users/users.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([UserConsumptionsRepository]),
		forwardRef(() => UsersModule),
		UsagePointsModule
	],
	controllers: [UserConsumptionsController],
	providers: [UserConsumptionsService],
	exports: [UserConsumptionsService]
})
export class UserConsumptionsModule {}

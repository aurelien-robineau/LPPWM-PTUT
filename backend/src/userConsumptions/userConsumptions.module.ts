import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserConsumptionsController } from './userConsumptions.controller'
import { UserConsumptionsRepository } from './userConsumptions.repository'
import { UserConsumptionsService } from './userConsumptions.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([UserConsumptionsRepository]),
	],
	controllers: [UserConsumptionsController],
	providers: [UserConsumptionsService],
	exports: [UserConsumptionsService]
})
export class UserConsumptionsModule {}

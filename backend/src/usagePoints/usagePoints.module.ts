import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsagePointsController } from './usagePoints.controller'
import { UsagePointsRepository } from './usagePoints.repository'
import { UsagePointsService } from './usagePoints.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([UsagePointsRepository]),
	],
	controllers: [UsagePointsController],
	providers: [UsagePointsService],
	exports: [UsagePointsService]
})
export class UsagePointsModule {}

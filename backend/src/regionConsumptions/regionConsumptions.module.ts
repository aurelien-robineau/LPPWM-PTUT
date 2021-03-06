import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RegionConsumptionsController } from './regionConsumptions.controller'
import { RegionConsumptionsRepository } from './regionConsumptions.repository'
import { RegionConsumptionsService } from './regionConsumptions.service'
import { RegionsModule } from './../regions/regions.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([RegionConsumptionsRepository]),
		RegionsModule
	],
	controllers: [RegionConsumptionsController],
	providers: [RegionConsumptionsService],
	exports: [RegionConsumptionsService]
})
export class RegionConsumptionsModule {}

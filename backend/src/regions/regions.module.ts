import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RegionsController } from './regions.controller'
import { RegionsRepository } from './regions.repository'
import { RegionsService } from './regions.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([RegionsRepository]),
	],
	controllers: [RegionsController],
	providers: [RegionsService],
	exports: [RegionsService]
})
export class RegionsModule {}

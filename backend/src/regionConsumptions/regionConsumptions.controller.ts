import { Controller } from '@nestjs/common'
import { RegionConsumptionsService } from './regionConsumptions.service'

@Controller('v1/region-consumptions')
export class RegionConsumptionsController {
	constructor(
		private readonly service: RegionConsumptionsService
	) {}
}

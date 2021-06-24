import { Controller } from '@nestjs/common'
import { RegionsService } from './regions.service'

@Controller('v1/regions')
export class RegionsController {
	constructor(
		private readonly service: RegionsService
	) {}
}

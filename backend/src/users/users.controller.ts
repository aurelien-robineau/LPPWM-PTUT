import { Controller } from '@nestjs/common'
import { UsersService } from './users.service';

@Controller('v1/users')
export class UsersController {
	constructor(
		private readonly service: UsersService
	) {}
}

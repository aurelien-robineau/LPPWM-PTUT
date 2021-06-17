import { Controller, Post, Body } from '@nestjs/common'
import { UserConsumptionsService } from './userConsumptions.service'
import { GetUser } from './../users/user.decorator'
import { User } from 'src/users/user.entity'
import { GetDayConsumptionDto } from './../dto/userConsumptions.dto'
import { getDateMonthBounds, getDateWeekBounds, getDayOnlyFromDate } from 'src/utils/date.utils'

@Controller('v1/user-consumptions')
export class UserConsumptionsController {
	constructor(
		private readonly service: UserConsumptionsService
	) {}

	@Post('/day')
	async getComsumptionForDay(
		@GetUser() user: User,
		@Body() getDayConsumptionDto: GetDayConsumptionDto
	) {
		const { usagePointId, date } = getDayConsumptionDto

		const userConsumptions = await this.service.getUserConsumptions(
			user,
			usagePointId,
			new Date(date),
			'DAY'
		)

		return {
			usagePointId: usagePointId,
			days: userConsumptions,
			totalValueWatt: userConsumptions[0].valueWatt,
			date: getDayOnlyFromDate(new Date(date)),
			type: 'DAY'
		}
	}

	@Post('/week')
	async getComsumptionForWeek(
		@GetUser() user: User,
		@Body() getDayConsumptionDto: GetDayConsumptionDto
	) {
		const { usagePointId, date } = getDayConsumptionDto

		const userConsumptions = await this.service.getUserConsumptions(
			user,
			usagePointId,
			new Date(date),
			'WEEK'
		)

		let totalConsumption = 0
		userConsumptions.forEach(consumption => totalConsumption += consumption.valueWatt)

		return {
			usagePointId: usagePointId,
			days: userConsumptions,
			totalValueWatt: totalConsumption,
			date: getDayOnlyFromDate(getDateWeekBounds(new Date(date)).end),
			type: 'WEEK'
		}
	}

	@Post('/month')
	async getComsumptionForMonth(
		@GetUser() user: User,
		@Body() getDayConsumptionDto: GetDayConsumptionDto
	) {
		const { usagePointId, date } = getDayConsumptionDto

		const userConsumptions = await this.service.getUserConsumptions(
			user,
			usagePointId,
			new Date(date),
			'MONTH'
		)

		let totalConsumption = 0
		userConsumptions.forEach(consumption => totalConsumption += consumption.valueWatt)

		return {
			usagePointId: usagePointId,
			days: userConsumptions,
			totalValueWatt: totalConsumption,
			date: getDayOnlyFromDate(getDateMonthBounds(new Date(date)).end),
			type: 'MONTH'
		}
	}
}

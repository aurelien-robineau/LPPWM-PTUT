import { Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { RegionsModule } from './../regions/regions.module'
import { UsagePointsModule } from 'src/usagePoints/usagePoints.module'
import { RefreshTokensModule } from './../refreshTokens/refreshTokens.module'

@Module({
	imports: [
		UsersModule,
		UsagePointsModule,
		RegionsModule,
		RefreshTokensModule
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService]
})
export class AuthModule {}

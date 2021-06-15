import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthGuard } from './auth/auth.guard'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { AuthMiddleware } from './auth/auth.middleware'
import { RegionsModule } from './regions/regions.module'
import { UsagePointsModule } from './usagePoints/usagePoints.module'
import { UserConsumptionsModule } from './userConsumptions/userConsumptions.module'
import { RegionConsumptionsModule } from './regionConsumptions/regionConsumptions.module'
import { RefreshTokensModule } from './refreshTokens/refreshTokens.module'
import config from './config/config'

@Module({
	imports: [
		TypeOrmModule.forRoot({
			...config.database
		}),
		AuthModule,
		UsersModule,
		UsagePointsModule,
		UserConsumptionsModule,
		RegionsModule,
		RegionConsumptionsModule,
		RefreshTokensModule
	],
	controllers: [
		AppController
	],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})

export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(AuthMiddleware)
			.forRoutes('*');
	}
}


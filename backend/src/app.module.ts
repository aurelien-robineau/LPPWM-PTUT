import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthGuard } from './auth/auth.guard'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { AuthMiddleware } from './auth/auth.middleware'
import config from './config'

@Module({
	imports: [
		TypeOrmModule.forRoot({
			...config.database,
			synchronize: true,
			autoLoadEntities: true
		}),
		AuthModule,
		UsersModule
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


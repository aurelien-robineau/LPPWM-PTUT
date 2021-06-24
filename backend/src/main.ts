import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import config from './config/config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors()
	app.useGlobalPipes(new ValidationPipe())
	await app.listen(config.port)
	console.log(`Listening on http://localhost:${config.port}`);
}
bootstrap()

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	await app.listen(60000)
	console.log(`Listening on http://localhost:60000`);
}
bootstrap()

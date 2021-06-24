import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RefreshTokensService } from './refreshTokens.service'
import { RefreshTokensRepository } from './refreshTokens.repository'
import { UsersModule } from 'src/users/users.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([RefreshTokensRepository]),
		forwardRef(() => UsersModule)
	],
	controllers: [],
	providers: [RefreshTokensService],
	exports: [RefreshTokensService]
})
export class RefreshTokensModule {}

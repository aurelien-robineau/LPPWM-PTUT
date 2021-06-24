import { Repository, EntityRepository } from "typeorm"
import { RefreshToken } from './refreshToken.entity'

@EntityRepository(RefreshToken)
export class RefreshTokensRepository extends Repository<RefreshToken> {
}

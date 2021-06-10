import { Repository, EntityRepository } from "typeorm"
import { User } from './user.entity'

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

}

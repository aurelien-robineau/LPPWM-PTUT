import { Repository, EntityRepository } from "typeorm"
import { User } from './users.entity'

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

}

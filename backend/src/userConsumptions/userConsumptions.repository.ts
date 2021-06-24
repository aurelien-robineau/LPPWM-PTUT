import { Repository, EntityRepository } from "typeorm"
import { UserConsumption } from './userConsumption.entity'

@EntityRepository(UserConsumption)
export class UserConsumptionsRepository extends Repository<UserConsumption> {

}

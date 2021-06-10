import { Repository, EntityRepository } from "typeorm"
import { UsagePoint } from './usagePoint.entity'

@EntityRepository(UsagePoint)
export class UsagePointsRepository extends Repository<UsagePoint> {

}

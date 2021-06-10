import { Repository, EntityRepository } from "typeorm"
import { RegionConsumption } from './regionConsumption.entity'

@EntityRepository(RegionConsumption)
export class RegionConsumptionsRepository extends Repository<RegionConsumption> {

}

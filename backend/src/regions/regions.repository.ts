import { Repository, EntityRepository } from "typeorm"
import { Region } from './region.entity'

@EntityRepository(Region)
export class RegionsRepository extends Repository<Region> {

}

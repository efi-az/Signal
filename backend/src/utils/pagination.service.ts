import { Injectable } from "@nestjs/common";
import { FindManyOptions, FindOneOptions, QueryBuilder, Repository } from "typeorm";

@Injectable()
export class PaginationService {

  async paginate(repo:Repository<any>,query:FindManyOptions,page:number,take:number):Promise<any>
  {
    const newQuery:FindManyOptions=
      {
        where:query.where,
        skip:(page-1)*take,
        take:take,
        relations:query.relations,
      }
   await repo.find(newQuery)
  }
}
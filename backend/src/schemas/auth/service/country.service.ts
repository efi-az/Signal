import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ElasticService } from "../../../elastic/services/elastic.service";
import { PageOptionsDto } from "../../../utils/pagination/dto/page-option.dto";
import { PageDto } from "../../../utils/pagination/dto/page.dto";
import { CountriesEntity } from "../entities/countries.entity";

@Injectable()
export class CountryService {
  constructor(private elasticService:ElasticService)
  {}

  async countryList():Promise<Partial<CountriesEntity>[]>
  {
    return await this.elasticService.countryList()
  }
}
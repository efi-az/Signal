import { Injectable } from "@nestjs/common";
import { ElasticService } from "../../../elastic/services/elastic.service";
import { PageOptionsDto } from "../../../utils/pagination/dto/page-option.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { MarketEntity } from "../entities/market.entity";
import { Repository } from "typeorm";
import { PageDto } from "../../../utils/pagination/dto/page.dto";
import { PageMetaDto } from "../../../utils/pagination/dto/page-meta.dto";

@Injectable()
export class CryptoService {
  constructor(private elasticService:ElasticService,
              @InjectRepository(MarketEntity) private marketRepo:Repository<MarketEntity>)
  {}

  async getAllCryptosPagination(pageOptionsDto:PageOptionsDto)
  {
    return await this.elasticService.getAllCryptosPagination(pageOptionsDto)
  }

  async searchCryptoRealTime(searchedText:string)
  {
    return await this.elasticService.searchCryptoRealTime(searchedText)
  }

  async marketsPagination(pageOptionsDto:PageOptionsDto):Promise<PageDto<Partial<MarketEntity>>>
  {
    return await this.elasticService.marketsPagination(pageOptionsDto)
  }

  async searchMarket(marketText:string)
  {
    return await this.elasticService.searchMarket(marketText)
  }
}
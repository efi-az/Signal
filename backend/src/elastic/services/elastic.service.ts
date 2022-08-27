import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ArticleEntity } from "../../schemas/article/entities/article.entity";
import { CreateArticleDto } from "../dto/create-article.dto";
import { ElasticClientConstant } from "../elastic-client.constant";
import { Client } from "@elastic/elasticsearch";
import { Result } from "@elastic/elasticsearch/lib/api/types";
import { CoinsEntity } from "../../schemas/signal/entities/coins.entity";
import { PageOptionsDto } from "../../utils/pagination/dto/page-option.dto";
import { PageDto } from "../../utils/pagination/dto/page.dto";
import { PageMetaDto } from "../../utils/pagination/dto/page-meta.dto";
import { CountriesEntity } from "../../schemas/auth/entities/countries.entity";
import { MarketEntity } from "../../schemas/signal/entities/market.entity";

@Injectable()
export class ElasticService {
  constructor(@Inject(ElasticClientConstant) private elasticSearchService:Client)
  {}

  async createArticles(articleEntity:ArticleEntity):Promise<Result[]>
  {
    let createStatus:Result[]=[]
    for (const article of articleEntity.obj_categories) {
      const createArticelDto:CreateArticleDto=
        {
          articleId:articleEntity.id,
          slug:articleEntity.slug,
          title:articleEntity.title,
          summary:articleEntity.summary,
          description:articleEntity.description,
          readingTime:articleEntity.readingTime,
          metaKey:articleEntity.metaKey,
          metaDescription:articleEntity.metaDescription,
          createAt:articleEntity.createdAt,
          categoryId:article.id
        }
      const createArticleInEs=await this.elasticSearchService.index({index:"article",body:createArticelDto})
      createStatus.push(createArticleInEs.result)
    }
    return createStatus
  }

  async updateArticle(articleEntity:ArticleEntity)
  {
    for (const article of articleEntity.obj_categories) {
      const checkExist=await this.elasticSearchService.search({index:"article",query:{
        bool:{
          must:[
            {
              match:{
                articleId:articleEntity.id
              }
            },
            {
              match:{
                categoryId:article.id
              }
            }
          ]
        }
        }})
      if (checkExist.hits.hits.length>0)
      {
        for (const checkExistElement of checkExist.hits.hits) {
          const createArticelDto:CreateArticleDto=
            {
              articleId:articleEntity.id,
              slug:articleEntity.slug,
              title:articleEntity.title,
              summary:articleEntity.summary,
              description:articleEntity.description,
              readingTime:articleEntity.readingTime,
              metaKey:articleEntity.metaKey,
              metaDescription:articleEntity.metaDescription,
              createAt:articleEntity.createdAt,
              categoryId:article.id
            }
          const findedUpdate=await this.elasticSearchService.update({index:"posts",id:checkExistElement._id,body:{doc:createArticelDto}})
        }
      }

      const createArticelDto:CreateArticleDto=
        {
          articleId:articleEntity.id,
          slug:articleEntity.slug,
          title:articleEntity.title,
          summary:articleEntity.summary,
          description:articleEntity.description,
          readingTime:articleEntity.readingTime,
          metaKey:articleEntity.metaKey,
          metaDescription:articleEntity.metaDescription,
          createAt:articleEntity.createdAt,
          categoryId:article.id
        }
      const createArticle=await this.elasticSearchService.index({index:"posts",body:createArticelDto})

    }
  }

  async writeCoinsInElastic(coinEntity:CoinsEntity)
  {
    const createCoinInElastic=await this.elasticSearchService.index({index:"crypto",body:coinEntity})
    console.log(createCoinInElastic.result);
    return createCoinInElastic
  }

  async getAllCryptosPagination(pageOptionsDto:PageOptionsDto):Promise<PageDto<unknown>>
  {
    const cryptosPagination=await this.elasticSearchService.search({index:"crypto",from:pageOptionsDto.skip,size:pageOptionsDto.take})
    const mapSearchedData=cryptosPagination.hits.hits.map(x=>x._source)
    const itemCount=mapSearchedData.length
    const pageMetaDto=new PageMetaDto({pageOptionsDto,itemCount})
    return new PageDto(mapSearchedData,pageMetaDto)
  }

  async searchCryptoRealTime(searchedText:string)
  {
    // const searchCrypto=await this.elasticSearchService.search({index:"crypto",query:{
    //   more_like_this:{
    //    fields:["name"],
    //     like:searchedText
    //   }
    //   }})
    //
    // return searchCrypto.hits

    const sqlQuery=await this.elasticSearchService.sql.query({query:`SELECT * FROM crypto WHERE symbol LIKE '${searchedText}%'`,fetch_size:20})
    const data = sqlQuery.rows.map(row => {
      const obj = {}
      for (let i = 0; i < row.length; i++) {
        obj[sqlQuery.columns[i].name] = row[i]
      }
      return obj
    })

    return data
  }

  async createCountries(countryEntity:CountriesEntity)
  {
    const createCountry=await this.elasticSearchService.index({index:"country",body:countryEntity})
    console.log(createCountry);
    return createCountry.result
  }

  async countryList():Promise<Partial<CountriesEntity>[]>
  {
  // ,size:pageOptionsDto.take,from:pageOptionsDto.skip
    const find=await this.elasticSearchService.search({index:"country",size:250})
    const mapCountries:Partial<CountriesEntity>[]=find.hits.hits.map(x=>x._source)
    // const itemCount=mapCountries.length
    // const pageMetaDto=new PageMetaDto({pageOptionsDto,itemCount})
    return mapCountries
    // new PageDto(mapCountries,pageMetaDto)
  }

  async severStatus()
  {
    try {
      await this.elasticSearchService.info()
    }catch (e) {
      if (e.meta.statusCode==0)
      {
        throw new BadRequestException("Elastic Search Server Is Down")
      }

    }
  }

  async createMarketsInELastic(marketEntity:MarketEntity)
  {
    const createMarket=await this.elasticSearchService.index({index:"market",body:marketEntity})
    console.log(createMarket.result);
    return createMarket.result
  }

  async marketsPagination(pageOptionsDto:PageOptionsDto):Promise<PageDto<Partial<MarketEntity>>>
  {
    const marketsPagination=await this.elasticSearchService.search({index:"market",from:pageOptionsDto.skip,size:pageOptionsDto.take})
    const mappedResult=marketsPagination.hits.hits.map(x=>x._source)
    const itemCount=mappedResult.length
    const pageMetaDto=new PageMetaDto({pageOptionsDto,itemCount})
    return new PageDto(mappedResult,pageMetaDto)

  }

  async searchMarket(marketText:string)
  {
    const sqlQuery=await this.elasticSearchService.sql.query({query:`SELECT * FROM market WHERE crypto LIKE '${marketText}%'`,fetch_size:20})
    const data = sqlQuery.rows.map(row => {
      const obj = {}
      for (let i = 0; i < row.length; i++) {
        obj[sqlQuery.columns[i].name] = row[i]
      }
      return obj
    })

    return data
  }
}
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MarketEntity } from "../../schemas/signal/entities/market.entity";
import { IsNull, Repository } from "typeorm";
import { CoinsEntity } from "../../schemas/signal/entities/coins.entity";
import axios,{AxiosRequestConfig} from "axios";
import { RequestParamsDto } from "./request-params.dto";
import { ApiResponse } from "./api-response.data";
import { ElasticService } from "../../elastic/services/elastic.service";
import { CountriesEntity } from "../../schemas/auth/entities/countries.entity";
import { CountriesResponse } from "./countries-response.data";
import { ImagesResponse } from "./images.response";
import { IsNumber } from "class-validator";

@Injectable()
export class MarketBotService {
  constructor(@InjectRepository(MarketEntity) private marketRepository:Repository<MarketEntity>,
              @InjectRepository(CoinsEntity) private coinsRepository:Repository<CoinsEntity>,
              @InjectRepository(CountriesEntity) private countriesRepo:Repository<CountriesEntity>,
              private elasticService:ElasticService)
  {}

  async createMarketInstance(requestParam:RequestParamsDto)
  {
    let counter=[]
    const axiosRequestConfig:AxiosRequestConfig={
      method:"get",
      url:`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${requestParam.vs_currency}&order=${requestParam.order}&per_page=${requestParam.perPage}&page=${requestParam.page}`
    }
    const sendRequest=await axios(axiosRequestConfig)
    const apiRes:ApiResponse[]=sendRequest.data
    for (const coin of apiRes) {
      const coinEnt=new CoinsEntity()
      coinEnt.coinId=coin.id
        coinEnt.circulatingSupply=(coin.circulating_supply).toString()
      coinEnt.image=coin.image
      coinEnt.name=coin.name
      coinEnt.symbol=coin.symbol
      coinEnt.totalSupply=coin.total_supply?(coin.total_supply).toString():null
      coinEnt.maxSupply=coin.max_supply?(coin.max_supply).toString():null
      const saveCoin=await this.coinsRepository.save(await this.coinsRepository.create(coinEnt))
      counter.push(saveCoin)
    }
    return {
      data:counter,
      counter:counter.length
    }
  }

  async createMarket(requestParam:RequestParamsDto)
  {
    let counter=[]
    const axiosRequestConfig:AxiosRequestConfig={
      method:"get",
      url:`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${requestParam.vs_currency}&order=${requestParam.order}&per_page=${requestParam.perPage}&page=${requestParam.page}`
    }
    const sendRequest=await axios(axiosRequestConfig)
    const apiRes:ApiResponse[]=sendRequest.data
    for (const coin of apiRes) {
      const marketEnt=new MarketEntity()
      marketEnt.image=coin.image
      marketEnt.crypto=coin.symbol
      marketEnt.base="usd"
      const saveMarket=await this.marketRepository.save(await this.marketRepository.create(marketEnt))
      counter.push(saveMarket)
    }
    return {
      data:counter,
      counter:counter.length
    }
  }

  async createCoinsInElastic()
  {
    let counter=[]
    const findAllCoins=await this.coinsRepository.find()
    for (const findAllCoin of findAllCoins) {
      const create=await this.elasticService.writeCoinsInElastic(findAllCoin)
      counter.push(create)
    }

    return {
      result:counter,
      count:counter.length
    }
  }

  async createCountries()
  {
    let counter=[]
    const axiosRequest:AxiosRequestConfig=
      {
        method:"get",
        url:"https://restcountries.com/v2/all"
      }
      const sendRequest=await axios(axiosRequest)
        const responseData:CountriesResponse[]=sendRequest.data
    console.log(responseData);
    for (const country of responseData) {
      const countryEnt=new CountriesEntity()
      countryEnt.name=country.name
      countryEnt.callingCode=country.callingCodes
      countryEnt.capital=country.capital?country.capital:null
      countryEnt.region=country.region
      countryEnt.flagImage=country.flag
      const saveCountry=await this.countriesRepo.save(await this.countriesRepo.create(countryEnt))
      console.log(saveCountry);
      counter.push(saveCountry)
    }
    return {
      data:counter,
      count:counter.length
    }
  }

  async createCountriesElastic()
  {
    let counter=[]
    const findAllCountries=await this.countriesRepo.find()
    for (const country of findAllCountries) {
     const createInElastic=await this.elasticService.createCountries(country)
      counter.push(createInElastic)
    }

    return counter.length
  }

  async updateImages()
  {
    let counter=[]
    const axiosRequest:AxiosRequestConfig=
      {
        method:"get",
        url:"http://rest.coinapi.io/v1/assets/icons/30",
        headers:{"X-CoinAPI-Key":"947C0048-2B42-4E53-9D28-14737B5D91D5"}
      }

      const sendRequest=await axios(axiosRequest)
      const data:ImagesResponse[]=sendRequest.data

    for (const image of data) {
      const findInDb=await this.coinsRepository.findOne({where:{symbol:image.asset_id.toLowerCase()}})
      if (findInDb)
      {
        findInDb.image=image.url
        const saveImage=await this.coinsRepository.save(await this.coinsRepository.create(findInDb))
        counter.push(saveImage)
      }
    }
  }

  async completeMarketInfo(requestParam:RequestParamsDto)
  {
    const findAllMarkets=await this.marketRepository.find({where:{crypto:IsNull(),base:IsNull(),image:IsNull()}})
    const axiosRequestConfig:AxiosRequestConfig={
      method:"get",
      url:`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${requestParam.vs_currency}&order=${requestParam.order}&per_page=${requestParam.perPage}&page=${requestParam.page}`
    }
    const sendRequest=await axios(axiosRequestConfig)
    const apiRes:ApiResponse[]=sendRequest.data

    for (const findAllMarket of findAllMarkets) {
      for (const coin of apiRes) {
        findAllMarket.image=coin.image
        findAllMarket.crypto=coin.symbol
        findAllMarket.base="usdt"
        const saveMarket=await this.marketRepository.save(await this.marketRepository.create(findAllMarket))
        console.log(saveMarket);
      }
    }
  }

  async createMarketsOnElastic()
  {
    const findALlMarkets=await this.marketRepository.find()
    for (const findALlMarket of findALlMarkets) {
      await this.elasticService.createMarketsInELastic(findALlMarket)
    }
  }
}



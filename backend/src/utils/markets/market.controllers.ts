import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { MarketBotService } from "./market-bot.service";
import { RequestParamsDto } from "./request-params.dto";

@ApiTags("Transfer Bot")
@Controller("bot")
export class MarketControllers {
  constructor(private marketBotService:MarketBotService)
  {}

  @Post("create/coins")
  @ApiExcludeEndpoint()
  async createMarketInstance(@Body() requestParam:RequestParamsDto)
  {
    return this.marketBotService.createMarketInstance(requestParam)
  }

  @Post("create/market")
  // @ApiExcludeEndpoint()
  async createMarket(@Body() requestParam:RequestParamsDto)
  {
    return this.marketBotService.createMarket(requestParam)
  }

  @Post("create/coins/elastic")
  // @ApiExcludeEndpoint()
  async createCoinsInElastic()
  {
    return this.marketBotService.createCoinsInElastic()
  }

 @Post("create/countries")
 @ApiExcludeEndpoint()
  async createCountries()
 {
   return this.marketBotService.createCountries()
 }

  @Post("create/countries/el")
  @ApiExcludeEndpoint()
  async createCountriesElastic()
  {
    return this.marketBotService.createCountriesElastic()
  }

  @Get("update/images")
  async updateImages()
  {
    return this.marketBotService.updateImages()
  }

  @Post("complete/markets")
  async completeMarketInfo(@Body() requestParam:RequestParamsDto)
  {
    return this.marketBotService.completeMarketInfo(requestParam)
  }

  @Post("markets/elastic")
  async createMarketsOnElastic()
  {
    return this.marketBotService.createMarketsOnElastic()
  }
}
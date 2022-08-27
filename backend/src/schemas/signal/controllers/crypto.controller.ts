import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CryptoService } from "../services/crypto.service";
import { PageOptionsDto } from "../../../utils/pagination/dto/page-option.dto";
import { PageDto } from "../../../utils/pagination/dto/page.dto";
import { MarketEntity } from "../entities/market.entity";

@ApiTags("Crypto")
@Controller("crypto")
export class CryptoController {
  constructor(private cryptoService:CryptoService)
  {}

  @Post("get/coins/pagination")
  async getAllCryptosPagination(@Body() pageOptionsDto:PageOptionsDto)
  {
    return this.cryptoService.getAllCryptosPagination(pageOptionsDto)
  }

  @Get("search/crypto/:text")
  async searchCryptoRealTime(@Param("text") searchedText:string)
  {
    return this.cryptoService.searchCryptoRealTime(searchedText)
  }

  @Post("market/pagination")
  async marketsPagination(@Body() pageOptionsDto:PageOptionsDto):Promise<any>
  {
    return this.cryptoService.marketsPagination(pageOptionsDto)
  }

  @Get("market/search/:text")
  async searchMarket(@Param("text") marketText:string)
  {
    return this.cryptoService.searchMarket(marketText)
  }
}
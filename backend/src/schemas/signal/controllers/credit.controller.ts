import { Body, Controller, Delete, Get, Patch, Post, Query } from "@nestjs/common";
import { CreditService } from "../services/credit.service";
import { CreateCreditDto } from "../dto/create-credit.dto";
import { IJwtUserInfo } from "../../auth/interfaces/jwt-user-info.interface";
import { UseJwtGuard } from "../../../guards/jwt.guard";
import { UseBearerAuth } from "../../../configuration/swagger/use-bearer-auth.decorator";
import { JwtUserInfo } from "../../../decorators/jwt-user-info.decorator";
import { CreditEntity } from "../entities/credit.entity";
import { PageOptionsDto } from "../../../utils/pagination/dto/page-option.dto";
import { PageDto } from "../../../utils/pagination/dto/page.dto";
import { ApiTags } from '@nestjs/swagger';

@ApiTags("[Credit]")
@Controller("credit")
export class CreditController {
  constructor(private creditService:CreditService)
  {}

  @Post("create")
  @UseJwtGuard()
  @UseBearerAuth()
  async createCredit(@Body() createCreditDto:CreateCreditDto,@JwtUserInfo() userInfo:IJwtUserInfo):Promise<any>
  {
    return this.creditService.createCredit(createCreditDto,userInfo)
  }

  @Patch("update")
  @UseJwtGuard()
  @UseBearerAuth()
  async updateCredit(@Query("creditId") creditId:string,@Body() createCreditDto:CreateCreditDto):Promise<any>
  {
    return this.creditService.updateCredit(creditId, createCreditDto)
  }

  @UseJwtGuard()
  @UseBearerAuth()
  @Delete("passive")
  async passiveCredit(@Query("creditId") creditId:string):Promise<void>
  {
    return this.creditService.passiveCredit(creditId)
  }

  @Get("all/active")
  async getAllCredits(@Query() pageOptionsDto:PageOptionsDto):Promise<PageDto<CreditEntity>>
  {
    return this.creditService.getAllCredits(pageOptionsDto)
  }
}
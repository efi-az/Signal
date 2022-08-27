import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CustomSignalService } from "../services/custom-signal.service";
import { IJwtUserInfo } from "../../auth/interfaces/jwt-user-info.interface";
import { CreateCustomSignalRequestDto } from "../dto/create-custom-signal-request.dto";
import { CustomSignalRequestEntity } from "../entities/custom-signal-request.entity";
import { UseJwtGuard } from "../../../guards/jwt.guard";
import { UseBearerAuth } from "../../../configuration/swagger/use-bearer-auth.decorator";
import { JwtUserInfo } from "../../../decorators/jwt-user-info.decorator";
import { CreateCustomizedSignalDto } from "../dto/create-customized-signal.dto";
import { CustomizedSignalEntity } from "../entities/custom-signal.entity";
import { PageOptionsDto } from "../../../utils/pagination/dto/page-option.dto";
import { PageDto } from "../../../utils/pagination/dto/page.dto";

@ApiTags("[Custom Signal]")
@Controller("custom/signal")
export class CustomSignalController {
  constructor(private customSignalService:CustomSignalService)
  {}

  @UseJwtGuard()
  @UseBearerAuth()
  @Post("create/req")
  async createCustomSignalRequest(@JwtUserInfo() userInfo:IJwtUserInfo,@Body() createCustomSignalReqDto:CreateCustomSignalRequestDto):Promise<CustomSignalRequestEntity>
  {
    return this.customSignalService.createCustomSignalRequest(userInfo, createCustomSignalReqDto)
  }

  @UseJwtGuard()
  @UseBearerAuth()
  @Post("create")
  async createCustomSignal(@JwtUserInfo() userInfo:IJwtUserInfo,@Body() createCustomSignalDto:CreateCustomizedSignalDto):Promise<CustomizedSignalEntity>
  {
    return this.customSignalService.createCustomSignal(userInfo, createCustomSignalDto)
  }

  @UseJwtGuard()
  @UseBearerAuth()
  @Get("all/req")
  async getAllCustomSignalReq(@Query() pageOptionsDto:PageOptionsDto):Promise<PageDto<CustomSignalRequestEntity>>
  {
    return this.customSignalService.getAllCustomSignalReq(pageOptionsDto)
  }

  @UseJwtGuard()
  @UseBearerAuth()
  @Get("user/req")
  async getUserCustomSignalReq(@JwtUserInfo() userInfo:IJwtUserInfo):Promise<CustomSignalRequestEntity[]>
  {
    return this.customSignalService.getUserCustomSignalReq(userInfo)
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Get("user")
  async getUserCustomSignal(@JwtUserInfo() userInfo:IJwtUserInfo):Promise<CustomSignalRequestEntity[]>
  {
    return this.customSignalService.getUserCustomSignal(userInfo)
  }
}
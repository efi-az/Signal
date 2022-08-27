import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from "../service/auth.service";
import { Request } from "express";
import { OauthUser } from "../../../decorators/oauth-user.decorator";
import { OauthUserInfo } from "../interfaces/oauth-user-info";
import { ApiBody, ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { UseJwtGuard } from "../../../guards/jwt.guard";
import { JwtUserInfo } from "../../../decorators/jwt-user-info.decorator";
import { IJwtUserInfo } from "../interfaces/jwt-user-info.interface";
import { UseBearerAuth } from "../../../configuration/swagger/use-bearer-auth.decorator";
import { UseGoogleGuard } from "../../../guards/google.guard";
import { CreateUserProfileDto } from "../dto/create-user-info.dto";
import { UserInfoEntity } from "../entities/user-info.entity";
import { UserLoggerInterceptor, UseUserLoggerInterceptor } from "../../../interceptors/user.logger.interceptor";
import { SkipThrottle } from "@nestjs/throttler";
import { CheckMobileOtpDto, MobileSendOtpDto } from "../dto/otp.dto";
import { EmailSendOtpDto } from "../dto/email-otp.dto";
import { CheckEmailOtpDto } from "../dto/check-email-otp.dto";
import { PageOptionsDto } from "../../../utils/pagination/dto/page-option.dto";
import { PageDto } from "../../../utils/pagination/dto/page.dto";
import { UserLoggerEntity } from "../entities/user-logger.entity";

@ApiTags("[Auth]")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post("sendOtp")
  @ApiBody({type:MobileSendOtpDto})
  async sendOtp(@Body() sendOtpDto: MobileSendOtpDto| EmailSendOtpDto): Promise<any> {
    return await this.authService.sendOtp(sendOtpDto);
  }

  @UseUserLoggerInterceptor()
  @Post("checkOtp")
  @ApiBody({type:CheckMobileOtpDto})
  async checkOtp(@Body() checkOtpDto: CheckMobileOtpDto | CheckEmailOtpDto, @Req() req: Request): Promise<any> {
    return await this.authService.checkOtp(checkOtpDto);
  }

  @Post("user/profile")
  @UseBearerAuth()
  @UseJwtGuard()
  async userProfile(@JwtUserInfo() userInfo: IJwtUserInfo, @Body() createUserProfileDto: CreateUserProfileDto): Promise<any> {
    return this.authService.userProfile(userInfo, createUserProfileDto);
  }

  @Put("user/profile")
  @UseBearerAuth()
  @UseJwtGuard()
  async updateUserProfile(@JwtUserInfo() userInfo:IJwtUserInfo,@Body() updateProfileDto:CreateUserProfileDto):Promise<UserInfoEntity>
  {
    return this.authService.updateUserProfile(userInfo,updateProfileDto)
  }

  @UseJwtGuard()
  @UseBearerAuth()
  @Get("user")
  async findUserByToken(@JwtUserInfo() userInfo: IJwtUserInfo): Promise<any> {
    return this.authService.findUserByToken(userInfo);
  }

  @Get("oauth/request")
  @UseGoogleGuard()
  async googleAuthenticate(@Req() req) {
  }

  @UseUserLoggerInterceptor()
  @Get("google/callback")
  @UseGoogleGuard()
  @ApiExcludeEndpoint()
  googleAuthRedirect(@OauthUser() oauthUser: OauthUserInfo) {
    return this.authService.googleAuthLogin(oauthUser);
  }

  @UseJwtGuard()
  @UseBearerAuth()
  @Get("test/token")
  testDeco(@JwtUserInfo() userInfo: IJwtUserInfo): any {
    console.log(userInfo);
  }

  @UseJwtGuard()
  @UseBearerAuth()
  @Post("user/reports")
  async userLoginReports(@JwtUserInfo() userInfo:IJwtUserInfo,@Body() pageOptionsDto:PageOptionsDto):Promise<PageDto<UserLoggerEntity>>
  {
    return this.authService.userLoginReports(userInfo, pageOptionsDto)
  }
}
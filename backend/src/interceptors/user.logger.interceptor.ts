import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { InjectRepository } from "@nestjs/typeorm";
import { UserLoggerEntity } from "../schemas/auth/entities/user-logger.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { DecodedToken } from "../classes/decoded-token.class";
import {Request} from "express"
import { ParsedUserAgent } from "../classes/parsed-ua.class";
const parser=require("ua-parser-js")

export function UseUserLoggerInterceptor() {
  return UseInterceptors(UserLoggerInterceptor)
}

export class UserLoggerInterceptor implements NestInterceptor{
  constructor(@InjectRepository(UserLoggerEntity) private userLoggerRepo:Repository<UserLoggerEntity>,
              private jwtService:JwtService)
  {}
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const req:Request=context.switchToHttp().getRequest()
    const ua=req.get("user-agent")
    const parsedUa:ParsedUserAgent=parser(ua)

    return next.handle().pipe(tap(async data=>{
      const decodedToken:string | {[p: string]: any}| DecodedToken=this.jwtService.decode(data)
      const userLogger=new UserLoggerEntity()
      userLogger.userId=(decodedToken as DecodedToken).userId
      userLogger.os=parsedUa.os.name
      userLogger.osVersion=parsedUa.os.version
      userLogger.browser=parsedUa.browser.name
      userLogger.browserVersion=parsedUa.browser.version
      const save=await this.userLoggerRepo.save(await this.userLoggerRepo.create(userLogger))
    }))
  }

}
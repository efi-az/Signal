import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfig {
  constructor(private configService:ConfigService)
  {}

  get mode():string
  {
    return this.configService.get<string>("app.mode")
  }

  get port():number
  {
    const parsedPort=parseInt(this.configService.get<string>("app.port"))
    return parsedPort
  }

  get apiGlobalPrefix():string
  {
    return this.configService.get<string>("app.apiGlobalPrefix")
  }
}
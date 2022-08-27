import { Module } from '@nestjs/common';
import appConfiguration from "./app/configuration"
import swaggerConfiguration from "./swagger/configuration"
import { ConfigModule } from "@nestjs/config";
import { AppConfig } from "./app/app.config";
import { SwaggerConfig } from "./swagger/services/swagger.config";
import {validationSchema} from "./env.validation";
import throttlerConfiguration from "./app/throttler-configuration"
import postgresConfiguration from "./database/postgres.configuration"
import jwtConfiguration from "./app/jwt.configuration"

@Module({
  imports:[ConfigModule.forRoot({
    envFilePath: `${process.cwd()}/envs/.${process.env.NODE_ENV}.env`,
    load:[appConfiguration,swaggerConfiguration,throttlerConfiguration,postgresConfiguration,jwtConfiguration],
    validationSchema
  })],
  providers:[AppConfig,SwaggerConfig],
})
export class ConfigurationModule {}

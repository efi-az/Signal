import { ConfigurationModule } from "./configuration/configuration.module";
import { DatabaseModule } from "./database/database.module";
import { CachingModule } from "./caching/caching.module";
import { SmsModule } from "./utils/sms/sms.module";
import { AuthModule } from "./schemas/auth/auth.module";
import { ArticleModule } from "./schemas/article/article.module";
import { BookmarkModule } from "./schemas/bookmark/bookmark.module";
import { SignalModule } from "./schemas/signal/signal.module";

import { ErrorModule } from "./errors/error.module";
import { RateLimitingModule } from "./ratelimiting/ratelimiting.module";

import { ElasticModule } from "./elastic/elastic.module";
import { ThrottlerGuard } from "@nestjs/throttler";
import { ScheduleModule } from "@nestjs/schedule";
import { Module, OnModuleInit } from "@nestjs/common";
import { elasticModuleOptions } from "./configuration/elastic/elastic-module.options";
import { CryptoGateway } from "./gateways/crypto-gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MarketEntity } from "./schemas/signal/entities/market.entity";
import { MarketsModule } from "./utils/markets/markets.module";
import { ElasticService } from "./elastic/services/elastic.service";
import { MulterModule } from "@nestjs/platform-express";
import { MulterConfigurations } from "./configuration/multer/multer-config";

@Module({
  imports: [
    TypeOrmModule.forFeature([MarketEntity]),MarketsModule,ConfigurationModule, DatabaseModule, CachingModule, SmsModule,
    AuthModule, ArticleModule, BookmarkModule, SignalModule, ErrorModule, ScheduleModule.forRoot(),
    // RateLimitingModule,
    ElasticModule.register(elasticModuleOptions)],
  providers: [CryptoGateway
  //   {
  //   provide: "APP_GUARD",
  //   useClass: ThrottlerGuard
  // }
  ]
})
export class AppModule implements OnModuleInit{
  constructor(private elasticService:ElasticService)
  {}
 async onModuleInit()
   {
     await this.elasticService.severStatus()
   }
}

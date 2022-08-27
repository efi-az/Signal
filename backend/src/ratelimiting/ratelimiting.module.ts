import { Module } from '@nestjs/common';
import { ThrottlerModule } from "@nestjs/throttler";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
  imports:[ThrottlerModule.forRootAsync(
    {
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>({
        ttl:parseInt(config.get<string>("throttler.ttl")),
        limit:parseInt(config.get<string>("throttler.limit"))
      })
    }
  )]
})
export class RateLimitingModule {}


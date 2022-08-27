import { CacheModuleOptions, CacheOptionsFactory } from "@nestjs/common";
import * as redisStore from "cache-manager-ioredis"
export class CacheConfig implements CacheOptionsFactory{
  createCacheOptions(): Promise<CacheModuleOptions<Record<string, any>>> | CacheModuleOptions<Record<string, any>> {
    const options:CacheModuleOptions=
      {
          store: redisStore,
          host: process.env.REDIS_HOST,
          password: process.env.REDIS_PASSWORD,
          port: process.env.REDIS_PORT,
          ttl: 10
      }
      return options
  }

}
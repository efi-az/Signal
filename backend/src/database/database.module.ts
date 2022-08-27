import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: "postgres",
      host: config.get<string>("postgres.host"),
      port: parseInt(config.get<string>("postgres.port")),
      database: config.get<string>("postgres.database"),
      username: config.get<string>("postgres.username"),
      password: process.env.DATABASE_PASSWORD,
      autoLoadEntities: config.get<boolean>("postgres.autoLoadEntities"),
      synchronize: config.get<boolean>("postgres.synchronize")
    })
  })]
})
export class DatabaseModule {
}

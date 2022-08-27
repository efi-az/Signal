import { Module } from "@nestjs/common";
import { MarketBotService } from "./market-bot.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MarketEntity } from "../../schemas/signal/entities/market.entity";
import { CoinsEntity } from "../../schemas/signal/entities/coins.entity";
import { MarketControllers } from "./market.controllers";
import { ElasticModule } from "../../elastic/elastic.module";
import { CountriesEntity } from "../../schemas/auth/entities/countries.entity";

@Module({ imports:[TypeOrmModule.forFeature([MarketEntity,CoinsEntity,CountriesEntity])],
  controllers:[MarketControllers],
  providers: [MarketBotService] })
export class MarketsModule {}
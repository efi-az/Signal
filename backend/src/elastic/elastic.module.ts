import { DynamicModule, Module, OnModuleInit } from "@nestjs/common";
import { ElasticService } from "./services/elastic.service";
import { ClientOptions ,Client} from "@elastic/elasticsearch";
import { ElasticClientConstant } from "./elastic-client.constant";

@Module({})
export class ElasticModule{
  static register(elasticModuleOptions:ClientOptions):DynamicModule{
    return {
      module:ElasticModule,
      providers:[
        {
          provide:ElasticClientConstant,
          useFactory:()=>{
            return new Client(elasticModuleOptions)
          }
        },
        ElasticService],
      global:true,
      exports:[
        {
          provide:ElasticClientConstant,
          useFactory:()=>{
            return new Client(elasticModuleOptions)
          }
        },
        ElasticService]
    }
  }
}

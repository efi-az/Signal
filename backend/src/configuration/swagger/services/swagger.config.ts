import { INestApplication, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

@Injectable()
export class SwaggerConfig {
  constructor(private configService:ConfigService)
  {}

  get title():string
  {
    return this.configService.get<string>("swagger.title")
  }

  get description():string
  {
    return this.configService.get<string>("swagger.description")
  }

  get prefix():string
  {
    return this.configService.get<string>("swagger.prefix")
  }

  get version():string
  {
    return this.configService.get<string>("swagger.version")
  }

  get tag():string
  {
    return this.configService.get<string>("swagger.tag")
  }

  initialize(app:INestApplication)
  {
    const config = new DocumentBuilder()
      .setTitle(this.title)
      .setDescription(this.description)
      .setVersion(this.version)
      .addTag(this.tag)
      .addBearerAuth({type:"http",scheme:"bearer",bearerFormat:"JWT",in:"headers"},
        "access-token")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(this.prefix, app, document);
  }
}
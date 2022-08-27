import { INestApplication, Module, OnModuleInit } from "@nestjs/common";
import {SmsModule} from "../../utils/sms/sms.module";
import {CachingModule} from "../../caching/caching.module";
import {AuthController} from "./controller/auth.controller";
import {AuthService} from "./service/auth.service";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { PermissionEntity } from "./entities/permission.entity";
import { RoleEntity } from "./entities/role.entity";
import { UserEntity } from "./entities/user.entity";
import { UserImageEntity } from "./entities/user-image.entity";
import { UserInfoEntity } from "./entities/user-info.entity";
import { JwtModule } from "@nestjs/jwt";
import { GoogleStrategy } from "../../strategies/google.strategy";
import { JwtStrategy } from "../../strategies/jwt.strategy";
import { RoleService } from "./service/role.service";
import { RoleController } from "./controller/role.controller";
import { PermissionController } from "./controller/permission.controller";
import { PermissionService } from "./service/permission.service";
import { RoutesEntity } from "./entities/routes.entity";
import { UserLoggerEntity } from "./entities/user-logger.entity";
import { Repository } from "typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ReferralEntity } from "./entities/referral.entity";
import { ReferralController } from "./controller/referral.controller";
import { ReferralService } from "./service/referral.service";
import { EmailModule } from "../../utils/email/email.module";
import { CountriesEntity } from "./entities/countries.entity";
import { CountryController } from "./controller/country.controller";
import { CountryService } from "./service/country.service";

@Module({
    imports: [EmailModule,SmsModule, CachingModule,
      JwtModule.registerAsync({imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>({
        secret:config.get("jwt.secret")
      })}),
    TypeOrmModule.forFeature([CountriesEntity,PermissionEntity,RoleEntity,UserEntity,UserImageEntity,UserInfoEntity,RoutesEntity,UserLoggerEntity,ReferralEntity])],
    controllers: [CountryController,AuthController,RoleController,PermissionController,ReferralController],
    providers: [CountryService,AuthService,GoogleStrategy,JwtStrategy,PermissionService,RoleService,ReferralService]
})

export class AuthModule implements OnModuleInit{
  constructor(@InjectRepository(RoleEntity) private roleRepo:Repository<RoleEntity>)
  {}

  async onModuleInit(): Promise<any> {
    const findUserRole=await this.roleRepo.findOne({where:{name:"user"}})
    if (!findUserRole)
      await this.roleRepo.save({name:"user"})
  }
}
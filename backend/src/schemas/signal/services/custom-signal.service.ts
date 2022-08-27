import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomSignalRequestEntity } from "../entities/custom-signal-request.entity";
import { In, Repository } from "typeorm";
import { CreateCustomSignalRequestDto } from "../dto/create-custom-signal-request.dto";
import { IJwtUserInfo } from "../../auth/interfaces/jwt-user-info.interface";
import { UserEntity } from "../../auth/entities/user.entity";
import { MarketEntity } from "../entities/market.entity";
import { CustomizedSignalEntity } from "../entities/custom-signal.entity";
import { CreateCustomizedSignalDto } from "../dto/create-customized-signal.dto";
import { CustomSignalEnum } from "../enums/custom-signal.enum";
import { PageOptionsDto } from "../../../utils/pagination/dto/page-option.dto";
import { PageMetaDto } from "../../../utils/pagination/dto/page-meta.dto";
import { PageDto } from "../../../utils/pagination/dto/page.dto";

@Injectable()
export class CustomSignalService {
  constructor(@InjectRepository(CustomSignalRequestEntity) private customSignalRequestRepo:Repository<CustomSignalRequestEntity>,
              @InjectRepository(UserEntity) private userRepo:Repository<UserEntity>,
              @InjectRepository(MarketEntity) private marketRepo:Repository<MarketEntity>,
              @InjectRepository(CustomizedSignalEntity) private customSignalRepo:Repository<CustomizedSignalEntity>)
  {}

  async createCustomSignalRequest(userInfo:IJwtUserInfo,createCustomSignalReqDto:CreateCustomSignalRequestDto):Promise<CustomSignalRequestEntity>
  {
    const customSignalReq=new CustomSignalRequestEntity()
    customSignalReq.marketType=createCustomSignalReqDto.marketType
    customSignalReq.barginType=createCustomSignalReqDto.barginType
    customSignalReq.timeFrame=createCustomSignalReqDto.timeFrame
    customSignalReq.status=CustomSignalEnum.ACTIVE
    customSignalReq.obj_user=await this.userRepo.findOne({where:{id:userInfo.userId}})
    customSignalReq.obj_market=await this.marketRepo.findOne({where:{id:createCustomSignalReqDto.marketId}})
    const save=await this.customSignalRequestRepo.save(await this.customSignalRequestRepo.create(customSignalReq))
    return save
  }

  async createCustomSignal(userInfo:IJwtUserInfo,createCustomSignalDto:CreateCustomizedSignalDto):Promise<CustomizedSignalEntity>
  {
    const findCustomSignalReq=await this.customSignalRequestRepo.findOne({where:{id:createCustomSignalDto.customSignalReqId},relations:["obj_customized_signal"]})

    const customSignal=new CustomizedSignalEntity()
    customSignal.obj_user=await this.userRepo.findOne({where:{id:userInfo.userId}})
    customSignal.description=createCustomSignalDto.description
    customSignal.entryPrice=createCustomSignalDto.entryPrice
    customSignal.targetPoints=createCustomSignalDto.targetPoints
    const saveCustomSignal=await this.customSignalRepo.save(await this.customSignalRepo.create(customSignal))

    findCustomSignalReq.status=CustomSignalEnum.COMPLETE
    findCustomSignalReq.obj_customized_signal=customSignal
    const saveCustomSignalReq=await this.customSignalRequestRepo.save(await this.customSignalRequestRepo.create(findCustomSignalReq))

      return saveCustomSignal
  }

    async getAllCustomSignalReq(pageOptionsDto:PageOptionsDto):Promise<PageDto<CustomSignalRequestEntity>>
    {
      const query=await this.customSignalRequestRepo.createQueryBuilder("csr")
        .where("csr.status=:status",{status:CustomSignalEnum.ACTIVE})
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take);

      const itemCount=await query.getCount()
      const {entities}=await query.getRawAndEntities()

      const pageMetaDto=new PageMetaDto({itemCount,pageOptionsDto})
      return new PageDto(entities,pageMetaDto)
    }

    async getUserCustomSignalReq(userInfo:IJwtUserInfo):Promise<CustomSignalRequestEntity[]>
    {
      const findUser=await this.userRepo.findOne({where:{id:userInfo.userId}})
      const findUserCustomSignalReq=await this.customSignalRequestRepo.find({where:{obj_user:In([findUser])}})
      return findUserCustomSignalReq
    }

    async getUserCustomSignal(userInfo:IJwtUserInfo):Promise<CustomSignalRequestEntity[]>
    {
      const findUser=await this.userRepo.findOne({where:{id:userInfo.userId}})
      const findUserCustomSignals=await this.customSignalRequestRepo.find({where:{obj_user:In([findUser]),status:CustomSignalEnum.COMPLETE},
        relations:["obj_customized_signal"]})

      return findUserCustomSignals

    }
}
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreditEntity } from "../entities/credit.entity";
import { CreateCreditDto } from "../dto/create-credit.dto";
import { IJwtUserInfo } from "../../auth/interfaces/jwt-user-info.interface";
import { UserEntity } from "../../auth/entities/user.entity";
import { UserEnum } from "../../auth/enums/user.enum";
import { CurrencyEntity } from "../entities/currency.entity";
import { CreditEnum } from "../enums/credit.enum";
import { PageDto } from "../../../utils/pagination/dto/page.dto";
import { PageOptionsDto } from "../../../utils/pagination/dto/page-option.dto";
import { PageMetaDto } from "../../../utils/pagination/dto/page-meta.dto";

@Injectable()
export class CreditService {
  constructor(@InjectRepository(CreditEntity) private creditRepo:Repository<CreditEntity>,
              @InjectRepository(UserEntity) private userRepo:Repository<UserEntity>,
              @InjectRepository(CurrencyEntity) private currencyRepo:Repository<CurrencyEntity>)
  {}

  async createCredit(createCreditDto:CreateCreditDto,userInfo:IJwtUserInfo):Promise<CreditEntity>
  {
    const credit=new CreditEntity()
    credit.name=createCreditDto.name
    credit.price=createCreditDto.price
    credit.pinned=createCreditDto.pinned
    credit.description=createCreditDto.description
    credit.expireTime=createCreditDto.expireTime
    credit.obj_user=await this.userRepo.findOne({where:{id:userInfo.userId,status:UserEnum.ACTIVE}})
    const save=await this.creditRepo.save(await this.creditRepo.create(credit))
    const find=await this.creditRepo.findOne({where:{id:save.id},relations:{obj_currency:true}})

    find.obj_currency.push(await this.currencyRepo.findOne({where:{id:createCreditDto.currencyId}}))
    const saveAgain=await this.creditRepo.save(await this.creditRepo.create(credit))
    return saveAgain
  }

  async updateCredit(creditId:string,createCreditDto:CreateCreditDto):Promise<CreditEntity>
  {
    const findCredit=await this.creditRepo.findOne({where:{id:creditId,status:CreditEnum.ACTIVE},relations:["obj_user"]})

    findCredit.status=createCreditDto.status
    findCredit.name=createCreditDto.name
    findCredit.price=createCreditDto.price
    findCredit.pinned=createCreditDto.pinned
    findCredit.obj_currency.push(await this.currencyRepo.findOne({where:{id:createCreditDto.currencyId}}))
    findCredit.expireTime=createCreditDto.expireTime
    findCredit.description=createCreditDto.description
    const save=await this.creditRepo.save(await this.creditRepo.create(findCredit))

    return save
  }

  async passiveCredit(creditId:string):Promise<void>
  {
    const findCredit=await this.creditRepo.findOne({where:{id:creditId,status:In([CreditEnum.ACTIVE,CreditEnum.DRAFT])}})
    if (!findCredit)
      throw new NotFoundException()

    findCredit.status=CreditEnum.PASSIVE
    const save=await this.creditRepo.save(await this.creditRepo.create(findCredit))
  }

  async getAllCredits(pageOptionsDto:PageOptionsDto):Promise<PageDto<CreditEntity>>
  {
    const query=await this.creditRepo.createQueryBuilder("credit")
      .where("credit.status=:status",{status:CreditEnum.ACTIVE})
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)

    const itemCount=await query.getCount()
    const {entities}=await query.getRawAndEntities()
    const pageMetaDto = new PageMetaDto({ itemCount,pageOptionsDto });

    return new PageDto(entities,pageMetaDto)
  }
}
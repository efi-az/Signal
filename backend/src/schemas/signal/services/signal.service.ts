import { SignalEntity } from "../entities/signal.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SignalDto } from "../dto/signal.dto";
import { SignalImageEntity } from "../entities/signal-image.entity";
import { IJwtUserInfo } from "../../auth/interfaces/jwt-user-info.interface";
import { UserEntity } from "../../auth/entities/user.entity";
import { BadRequestException } from "@nestjs/common";
import { SignalEnum } from "../enums/signal.enum";
import { PageDto } from "../../../utils/pagination/dto/page.dto";
import { PageOptionsDto } from "../../../utils/pagination/dto/page-option.dto";
import { PageMetaDto } from "../../../utils/pagination/dto/page-meta.dto";
import { SignalTpStatus } from "../enums/signal-tp-status.enum";
import { MarketEntity } from "../entities/market.entity";

export class SignalService {
  constructor(@InjectRepository(SignalEntity) private signalRep: Repository<SignalEntity>,
              @InjectRepository(SignalImageEntity) private signalImageRep: Repository<SignalImageEntity>,
              @InjectRepository(UserEntity) private userRep: Repository<UserEntity>,
              @InjectRepository(MarketEntity) private marketRepo:Repository<MarketEntity>) {
  }

  async createSignal(signalDto: SignalDto, userInfo: IJwtUserInfo): Promise<SignalEntity> {

    const findUser = await this.userRep.findOne({ where: { id: userInfo.userId }, relations: ['obj_signals'] });

    const signal = new SignalEntity();
    signal.marketType = signalDto.marketType;
    signal.leverage = signalDto.leverage;
    signal.barginType = signalDto.barginType;
    signal.risk = signalDto.risk;
    signal.entryPrice = signalDto.entryPrice;
    signal.stopLoss = signalDto.stopLoss;
    signal.targetPoints = signalDto.targetPoints;
    signal.description = signalDto.description;
    signal.status = signalDto.status;
    signal.obj_market=await this.marketRepo.findOne({where:{id:signalDto.marketId}})
    signal.obj_image = await this.signalImageRep.findOne({ where: { id: signalDto.imageId } });
    signal.obj_user = findUser;
    const savedSignal = await this.signalRep.save(await this.signalRep.create(signal));

    findUser.obj_signals.push(signal);
    await this.userRep.save(findUser);

    return savedSignal;
  }

  async updateSignal(signalDto: SignalDto, signalId: string): Promise<SignalEntity> {
    const findSignal = await this.signalRep.findOne({ where: { id: signalId } });
    if (!findSignal) throw new BadRequestException('signal not found');
    if (findSignal.status !== SignalEnum.DRAFT) throw new BadRequestException('just signal draft');

    findSignal.marketType = signalDto.marketType;
    findSignal.leverage = signalDto.leverage;
    findSignal.barginType = signalDto.barginType;
    findSignal.risk = signalDto.risk;
    findSignal.entryPrice = signalDto.entryPrice;
    findSignal.stopLoss = signalDto.stopLoss;
    findSignal.targetPoints = signalDto.targetPoints;
    findSignal.description = signalDto.description;
    findSignal.status = signalDto.status;
    findSignal.obj_image = await this.signalImageRep.findOne({ where: { id: signalDto.imageId } });
    return await this.signalRep.save(findSignal);
  }

  async getAllPagination(pageOptionsDto: PageOptionsDto): Promise<PageDto<SignalEntity>> {
    const queryBuilder = this.signalRep.createQueryBuilder('signal');

    queryBuilder
      .where('signal.status = :status', { status: SignalEnum.ACTIVE })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy("signal.createdAt",pageOptionsDto.order)

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async changeStatus(signalId: string): Promise<any> {
    const findSignal = await this.signalRep.findOne({ where: { id: signalId } });
    if (!findSignal) throw new BadRequestException('signal not found');

    if (findSignal.status!==SignalEnum.ACTIVE)
      throw new BadRequestException("Signal Is not Active")

    findSignal.tpStatus = SignalTpStatus.SUCCESS;
    await this.signalRep.save(findSignal);

    return true;
  }
}
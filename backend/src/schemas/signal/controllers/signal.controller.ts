import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { SignalService } from '../services/signal.service';
import { UseJwtGuard } from '../../../guards/jwt.guard';
import { UseBearerAuth } from '../../../configuration/swagger/use-bearer-auth.decorator';
import { SignalDto } from '../dto/signal.dto';
import { SignalEntity } from '../entities/signal.entity';
import { JwtUserInfo } from '../../../decorators/jwt-user-info.decorator';
import { IJwtUserInfo } from '../../auth/interfaces/jwt-user-info.interface';
import { PageDto } from '../../../utils/pagination/dto/page.dto';
import { PageOptionsDto } from '../../../utils/pagination/dto/page-option.dto';
import { MarketEnum } from "../enums/market.enum";
import { BarginEnum } from "../enums/bargin.enum";
import { SignalEnum } from "../enums/signal.enum";
import { SignalTpStatus } from "../enums/signal-tp-status.enum";

@ApiTags('[Signal]')
@Controller('signal')
export class SignalController {
  constructor(private signalService: SignalService) {
  }


  @Post()
  @UseJwtGuard()
  @UseBearerAuth()
  @ApiQuery({name:"market",enum:MarketEnum})
  @ApiQuery({name:"bargin",enum:BarginEnum})
  @ApiQuery({name:"status",enum:SignalEnum})
  async createSignal(@Body() signalDto: SignalDto,
                     @Query("market") market:MarketEnum,
                     @Query("bargin")  bargin:BarginEnum,
                     @Query("status") status:SignalEnum,
                     @JwtUserInfo() userInfo: IJwtUserInfo): Promise<SignalEntity>
  {
    const createSignalDto:SignalDto={
      status:status,
      barginType:bargin,
      description:signalDto.description,
      entryPrice:signalDto.entryPrice,
      imageId:signalDto.imageId,
      leverage:signalDto.leverage,
      risk:signalDto.risk,
      marketType:market,
      stopLoss:signalDto.stopLoss,
      targetPoints:signalDto.targetPoints,
      marketId:signalDto.marketId
    }
    return await this.signalService.createSignal(createSignalDto, userInfo);
  }

  @Put(':id')
  @UseJwtGuard()
  @UseBearerAuth()
  async updateSignal(@Body() signalDto: SignalDto, @Param('id') signalId: string): Promise<SignalEntity> {
    return await this.signalService.updateSignal(signalDto, signalId);
  }

  @Post("pagination")
  async getPaginationSignal(@Body() pageOptionsDto: PageOptionsDto): Promise<PageDto<SignalEntity>> {
    return await this.signalService.getAllPagination(pageOptionsDto);
  }

  @Put(':id')
  async successSignal(@Param('id') signalId: string): Promise<any> {
    return await this.signalService.changeStatus(signalId);
  }
}
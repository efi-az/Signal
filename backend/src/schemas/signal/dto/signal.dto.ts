import { MarketEnum } from '../enums/market.enum';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { BarginEnum } from '../enums/bargin.enum';
import { TargetPointsJson } from '../classes/target-points.json';
import { SignalEnum } from '../enums/signal.enum';
import { SignalTpStatus } from '../enums/signal-tp-status.enum';
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';

export class SignalDto {
  @ApiHideProperty()
  marketType: MarketEnum;

  @ApiProperty()
  @IsNumber()
  leverage: number;

  @ApiHideProperty()
  barginType: BarginEnum;

  @ApiProperty()
  @IsNumber()
  risk: number;

  @ApiProperty()
  @IsNumber()
  entryPrice: number;

  @ApiProperty()
  @IsNumber()
  stopLoss: number;

  @ApiProperty({ type: TargetPointsJson, isArray: true })
  @IsArray()
  @Type(() => TargetPointsJson)
  targetPoints: TargetPointsJson[];

  @ApiProperty()
  @IsString()
  description: string;

  @ApiHideProperty()
  status: SignalEnum;


  @ApiProperty()
  @IsOptional()
  imageId: string;

  @ApiProperty()
  marketId:string
}
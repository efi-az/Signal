import { IsEnum, IsString } from "class-validator";
import { MarketEnum } from "../enums/market.enum";
import { ApiProperty } from "@nestjs/swagger";
import { BarginEnum } from "../enums/bargin.enum";
import { TimeFrameEnum } from "../enums/time-frame.enum";

export class CreateCustomSignalRequestDto {
  @ApiProperty({enum:MarketEnum})
  @IsEnum(MarketEnum)
  marketType:MarketEnum

  @ApiProperty({enum:BarginEnum})
  @IsEnum(BarginEnum)
  barginType:BarginEnum

  @ApiProperty({enum:TimeFrameEnum})
  @IsEnum(TimeFrameEnum)
  timeFrame:TimeFrameEnum

  @ApiProperty()
  @IsString()
  marketId:string
}
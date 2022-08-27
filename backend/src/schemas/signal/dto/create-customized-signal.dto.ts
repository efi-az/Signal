import { TargetPointsJson } from "../classes/target-points.json";
import { UserEntity } from "../../auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCustomizedSignalDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  entryPrice:number

  @ApiProperty({example:{
    name:"",
      price:0
    }, isArray:true})
  @IsNotEmpty()
  targetPoints:TargetPointsJson[]

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description:string

  @IsString()
  @ApiProperty()
  customSignalReqId:string
}
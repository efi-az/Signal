import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class MobileSendOtpDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    mobile: string

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    mobilePrefix: string
}
 
export class CheckMobileOtpDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    code: string

    @IsString()
    @ApiProperty({example:"9350000000",description:"Please put your number without 0"})
    @IsNotEmpty()
    mobile: string

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    mobilePrefix: string

    @IsNumber()
    @ApiProperty()
    @IsOptional()
    refCode:number
}
import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { SetMobileOtpDto } from "./dto/set/set-mobile-otp.dto";
import { GetMobileOtpDto } from "./dto/get/get-mobile-otp.dto";
import { SetEmailOtpDto } from "./dto/set/set-email-otp.dto";

@Injectable()
export class CachingService {
  constructor(@Inject(CACHE_MANAGER) private cacheManger: Cache) {
  }

  public OTP_TTL: number = parseInt(process.env.CACHE_OTP_TTL);

  async setMobileOtp(setMobileOtp: SetMobileOtpDto): Promise<string> {
    const { mobilePrefix, mobileNumber, otpCode } = setMobileOtp;
    const ttl = this.OTP_TTL;
    return await this.cacheManger.set(`${mobilePrefix + mobileNumber}`, otpCode, {ttl});
  }

  async getMobileOtp(getMobileOtp: GetMobileOtpDto): Promise<string> {
    const { mobilePrefix, mobileNumber } = getMobileOtp;
    return await this.cacheManger.get(`${mobilePrefix + mobileNumber}`);
  }

  async setEmailOtp(setEmailOtp: SetEmailOtpDto): Promise<string> {
    const { otpCode, emailAddress } = setEmailOtp;
    const ttl = this.OTP_TTL;
    const setKey = await this.cacheManger.set(emailAddress, otpCode);
    return setKey;
  }

  async getEmailOtp(emailAddress: string): Promise<any> {
    const getKey = await this.cacheManger.get(emailAddress);
    return getKey;
  }
}
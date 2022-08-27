export class VerifyByMobile {
  mobilePrefix: string;
  mobile: string;
  refCode?:number

  constructor(mobilePrefix: string,
              mobile: string,
              refCode?:number) {
    this.mobile = mobile;
    this.mobilePrefix = mobilePrefix;
    this.refCode=refCode
  }
}
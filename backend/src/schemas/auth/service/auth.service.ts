import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { SmsService } from "../../../utils/sms/sms.service";
import { CheckMobileOtpDto, MobileSendOtpDto } from "../dto/otp.dto";
import { CachingService } from "../../../caching/caching.service";
import { SetMobileOtpDto } from "../../../caching/dto/set/set-mobile-otp.dto";
import { GetMobileOtpDto } from "../../../caching/dto/get/get-mobile-otp.dto";
import { VerifyByMobile } from "../dto/verify-by-mobile";
import { VerifyByEmail } from "../dto/verify-by-email";
import { UserEntity } from "../entities/user.entity";
import { OauthUserInfo } from "../interfaces/oauth-user-info";
import { JwtService } from "@nestjs/jwt";
import { FindOneOptions, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "../entities/role.entity";
import { RoleService } from "./role.service";
import { IJwtUserInfo } from "../interfaces/jwt-user-info.interface";
import { UserInfoEntity } from "../entities/user-info.entity";
import { CreateUserProfileDto } from "../dto/create-user-info.dto";
import { UserEnum } from "../enums/user.enum";
import { UserLoggerEntity } from "../entities/user-logger.entity";
import { ReferralEntity } from "../entities/referral.entity";
import { CreateReferralDto } from "../dto/create-referral.dto";
import { EmailSendOtpDto } from "../dto/email-otp.dto";
import { EmailService } from "../../../utils/email/email.service";
import { SetEmailOtpDto } from "../../../caching/dto/set/set-email-otp.dto";
import { CheckEmailOtpDto } from "../dto/check-email-otp.dto";
import { PageOptionsDto } from "../../../utils/pagination/dto/page-option.dto";
import { PageMetaDto } from "../../../utils/pagination/dto/page-meta.dto";
import { PageDto } from "../../../utils/pagination/dto/page.dto";

@Injectable()
export class AuthService {
  constructor(private smsService: SmsService, private cacheService: CachingService,
              @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
              @InjectRepository(UserInfoEntity) private userProfileRepo: Repository<UserInfoEntity>,
              @InjectRepository(UserLoggerEntity) private userLoggerRepo: Repository<UserLoggerEntity>,
              @InjectRepository(ReferralEntity) private referralRepo: Repository<ReferralEntity>,
              private jwtService: JwtService,
              private roleService: RoleService,
              private emailService:EmailService) {}

  async sendOtp(sendOtpDto: MobileSendOtpDto | EmailSendOtpDto): Promise<any> {
    if ("mobile" in sendOtpDto)
    {
      (sendOtpDto) as MobileSendOtpDto
      const {mobilePrefix,mobile}=sendOtpDto
      const code = AuthService.generateRandomOtpCode();
      await this.smsService.sendOtp(code, mobile);
      const setMobileOtp: SetMobileOtpDto = { mobilePrefix, mobileNumber: mobile, otpCode: code };
      return await this.cacheService.setMobileOtp(setMobileOtp);
    }

    if ("emailAddress" in sendOtpDto)
    {
      (sendOtpDto) as EmailSendOtpDto
      const {emailAddress}=sendOtpDto
      const code=AuthService.generateRandomOtpCode()
      await this.emailService.sentCode()
      const setEmailOtp:SetEmailOtpDto={emailAddress,otpCode:code}
      return await this.cacheService.setEmailOtp(setEmailOtp)
    }
  }

  async checkOtp(checkOtpDto: CheckMobileOtpDto | CheckEmailOtpDto): Promise<any> {
    if ("mobile" in checkOtpDto)
    {
      const { code, mobile, mobilePrefix, refCode } = checkOtpDto;
      const getMobileOtp: GetMobileOtpDto = { mobileNumber: mobile, mobilePrefix };
      const cacheCode = await this.cacheService.getMobileOtp(getMobileOtp);
      if (code !== cacheCode) throw new BadRequestException(cacheCode);

      const user = await this.userRepo.findOne({ where: { mobilePrefix: mobilePrefix, mobile: mobile } });
      if (user)
        return this.login(new VerifyByMobile(mobilePrefix, mobile));

      if (!user)
        return this.register(new VerifyByMobile(mobilePrefix, mobile, refCode));
    }
    if ("emailAddress" in checkOtpDto)
    {
      const {emailAddress,code,refCode}=checkOtpDto
      const getEmailCheckOtp=await this.cacheService.getEmailOtp(emailAddress)
      if (code !== getEmailCheckOtp) throw new UnauthorizedException(getEmailCheckOtp)

      const findUser=await this.userRepo.findOne({where:{email:emailAddress}})
      if (findUser)
      {
        return this.login(new VerifyByEmail(emailAddress))
      }

      if (!findUser)
      {
        return this.register(new VerifyByEmail(emailAddress))
      }
    }
  }

  async googleAuthLogin(oauthUser: OauthUserInfo): Promise<any> {
    const { email, firstName, lastName, picture, accessToken } = oauthUser;
    const findUser = await this.userRepo.findOne({ where: { email: email } });
    if (findUser)
      return this.login(new VerifyByEmail(email));

    if (!findUser)
      return this.register(new VerifyByEmail(email));
  }

  async register(register: VerifyByMobile | VerifyByEmail): Promise<any> {
    const findUserRoleQuery: FindOneOptions<RoleEntity> = { where: { name: 'user' } };
    const findRole = await this.roleService.findRole(findUserRoleQuery);
    if ('emailAddress' in register) {
      const user = new UserEntity();
      user.email = register.emailAddress;
      user.obj_roles.push(findRole);
      const save = await this.userRepo.save(await this.userRepo.create(user));
      const referralEntity=new ReferralEntity()
      referralEntity.obj_user=save
      const saveReferral=await this.referralRepo.save(await this.referralRepo.create(referralEntity))
      return this.generateToken(saveReferral.obj_user);
    }
    if ('mobile' in register) {
      const user = new UserEntity();
      user.mobilePrefix = register.mobilePrefix;
      user.mobile = register.mobile;
      user.obj_roles = [findRole];
      const save = await this.userRepo.save(await this.userRepo.create(user));
      const referralEntity=new ReferralEntity()
      referralEntity.obj_user=save
      const saveReferral=await this.referralRepo.save(await this.referralRepo.create(referralEntity))
      if (register.refCode)
      {
        const createReferral:CreateReferralDto=
          {
            parentRefCode:register.refCode,
            childUserId:save.id
          }
        await this.findReferraledUserAndCreateReferral(createReferral)
      }
      return this.generateToken(save);
    }
  }

  async login(login: VerifyByEmail | VerifyByMobile): Promise<any> {
    if ('emailAddress' in login) {
      const findUser = await this.userRepo.findOne({
        where: { email: login.emailAddress },
        relations: ['obj_roles', 'obj_userInfo'],
      });
      return this.generateToken(findUser);
    }
    if ('mobile' in login) {
      const findUser = await this.userRepo.findOne({
        where: { mobilePrefix: login.mobilePrefix, mobile: login.mobile },
        relations: ['obj_roles', 'obj_userInfo'],
      });
      return this.generateToken(findUser);
    }
  }

  async userProfile(userInfo: IJwtUserInfo, createUserProfileDto: CreateUserProfileDto): Promise<UserInfoEntity> {
    const findUser = await this.userRepo.findOne({ where: { id: userInfo.userId, status: UserEnum.ACTIVE } });

    const userProfile = new UserInfoEntity();
    userProfile.firstName = createUserProfileDto.firstName;
    userProfile.lastName = createUserProfileDto.lastName;
    userProfile.gender = createUserProfileDto.gender;
    const saveProfile = await this.userProfileRepo.save(await this.userProfileRepo.create(userProfile));

    findUser.obj_userInfo = saveProfile;
    const saveUser = await this.userRepo.save(await this.userRepo.create(findUser));

    return saveProfile;
  }

  async updateUserProfile(userInfo: IJwtUserInfo, updateProfileDto: CreateUserProfileDto): Promise<UserInfoEntity> {
    const findUser = await this.userRepo.findOne({
      where: { id: userInfo.userId, status: UserEnum.ACTIVE },
      relations: ["obj_userInfo"]
    });
    if (!findUser.obj_userInfo)
      throw new BadRequestException(`You dont have profile yet`);

    findUser.obj_userInfo.firstName = updateProfileDto.firstName;
    findUser.obj_userInfo.lastName = updateProfileDto.lastName;
    findUser.obj_userInfo.gender = updateProfileDto.gender;
    const save = await this.userProfileRepo.save(await this.userProfileRepo.create(findUser.obj_userInfo));
    return save;
  }

  async findUserByToken(userInfo: IJwtUserInfo): Promise<UserEntity> {
    const findUser = await this.userRepo.findOne({ where: { id: userInfo.userId }, relations: ["obj_userInfo"] });
    return findUser;
  }

  private static generateRandomOtpCode(): string {
    return Math.ceil(Math.random() * (999999 - 111111)).toString();
  }

  async findReferraledUserAndCreateReferral(createReferralDto: CreateReferralDto): Promise<ReferralEntity> {
    const { childUserId, parentRefCode } = createReferralDto;
    const findParentUser = await this.userRepo.findOne({where: { referralCode: parentRefCode }});
    console.log("here1");
    const findChildUser = await this.userRepo.findOne({ where: { id: childUserId } });
    console.log("here2");
    const parentQuery=await this.referralRepo.createQueryBuilder("referral")
    .innerJoin("referral.obj_user","user")
      .where("user.id = :parentId",{parentId:findParentUser.id})
     .getOne()
    console.log("here 3");
    const childQuery=await this.referralRepo.createQueryBuilder("referral")
      .innerJoin("referral.obj_user","user")
      .where("user.id = :childId",{childId:findChildUser.id})
      .getOne()
    console.log("here4");
    childQuery.parent=parentQuery
    const save=await this.referralRepo.save(await this.referralRepo.create(childQuery))
    return save
  }

  async userLoginReports(userInfo:IJwtUserInfo,pageOptionsDto:PageOptionsDto):Promise<PageDto<UserLoggerEntity>>
  {
    const userLogReports=await this.userLoggerRepo.createQueryBuilder("userLogger")
      .where("userLogger.userId = :userId",{userId:userInfo.userId})
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy("userLogger.createdAt",pageOptionsDto.order)
    const itemCount=await userLogReports.getCount()
    const {entities}= await userLogReports.getRawAndEntities()

    const pageMetaDto=new PageMetaDto({pageOptionsDto,itemCount})
    return new PageDto(entities,pageMetaDto)
  }

  async generateToken(user: UserEntity): Promise<string> {
    const userRole = user.obj_roles;
    const userId = user.id;
    const payload = { userId, userRole };
    return this.jwtService.sign(payload, { expiresIn: '12h' });
  }
}
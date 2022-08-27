import { Controller, Get, Query } from "@nestjs/common";
import { ReferralService } from "../service/referral.service";
import { ApiTags } from "@nestjs/swagger";
import { UseBearerAuth } from "../../../configuration/swagger/use-bearer-auth.decorator";
import { UseJwtGuard } from "../../../guards/jwt.guard";

@ApiTags("[Auth]")
@Controller("referral")
export class ReferralController {
  constructor(private referralService: ReferralService) {
  }

  @Get("children/tree")
  async userTreeChildren(@Query("userId") userId: string): Promise<any>
  {
    return this.referralService.userTreeChildren(userId)
  }

}

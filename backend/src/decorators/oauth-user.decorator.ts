import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { OauthUserInfo } from "../schemas/auth/interfaces/oauth-user-info";

export const OauthUser=createParamDecorator(
  (data:unknown,ctx:ExecutionContext):OauthUserInfo=>{
    const req=ctx.switchToHttp().getRequest()
    const user:OauthUserInfo=req.user
    return user
  }
)
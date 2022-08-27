import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IJwtUserInfo } from "../schemas/auth/interfaces/jwt-user-info.interface";

export const JwtUserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IJwtUserInfo => {
    const req = ctx.switchToHttp().getRequest();
    const user: IJwtUserInfo = req.user;
    return user;
  }
);
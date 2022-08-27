import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export function UseGoogleGuard()
{
  return UseGuards(AuthGuard("google"))
}
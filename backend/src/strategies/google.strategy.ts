import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID: "797022005097-pel4p3jif7vv2g2380bo4tpmfurntvq0.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:5000/auth/google/callback",
      scope: ["email", "profile"]
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile;
    const user =
      {
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        picture: photos[0].value,
        accessToken
      };
    done(null, user);
  }
}
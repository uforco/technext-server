import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook'; //issue
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('FACEBOOK_CLIENT_ID') as string,
      clientSecret: configService.get('FACEBOOK_CLIENT_SECRET') as string,
      callbackURL: `${configService.get('BACKEND_URL')}/auth/facebook/callback`,
      scope: ['email'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any,
  ) {
    console.log(profile);
    const payload = {
      profile,
    };

    done(null, payload);
  }
}

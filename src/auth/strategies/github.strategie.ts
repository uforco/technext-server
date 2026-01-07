import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('GITHUB_ID') as string,
      clientSecret: configService.get('GITHUB_SECRET') as string,
      callbackURL: `${configService.get('BACKEND_URL')}/auth/github/callback`,
      scope: ['user:email'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any,
  ) {
    const payload = {
      id: profile.id,
      email: profile.emails?.[0]?.value,
      firstName: profile.displayName,
      lastName: profile.username,
      provider: 'GITHUB',
      image: profile.photos?.[0]?.value,
    };
    done(null, payload);
  }
}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from './strategies/jwt-strategy';
import { GoogleStrategy } from './strategies/google.strategie';
import { PassportModule } from '@nestjs/passport';
import { GithubStrategy } from './strategies/github.strategie';
import { FacebookStrategy } from './strategies/facebook.strategie';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET as string,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GithubStrategy, FacebookStrategy],
})
export class AuthModule {}

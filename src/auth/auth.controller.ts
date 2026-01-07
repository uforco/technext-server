import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { GoogleGuard } from './guards/googleAuth0.guard';
import { User } from './decorators/user.decorator';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { GithubGuard } from './guards/githubAuth0.guard';
import { FacebookGuard } from './guards/facebookAuth0.guard';
import { CreateUser, LocalUserLoginDto } from './dto/createUser.Dto';
import cookieResponse from './cookieResponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // google auth login
  @Public()
  @UseGuards(GoogleGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleGuard)
  @Get('google/callback')
  async googleCallback(@User() user: any, @Res() res: Response) {
    console.log(user);
    const accessToken = await this.authService.socialmediaLogin({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      provider: user.provider,
      image: user.image,
    });

    cookieResponse(res, accessToken);
  }

  // github auth login
  @Public()
  @Get('github/login')
  @UseGuards(GithubGuard)
  githubLogin() {}

  @Public()
  @UseGuards(GithubGuard)
  @Get('github/callback')
  async githubCallback(@User() user: any, @Res() res: Response) {
    const accessToken = await this.authService.socialmediaLogin({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      provider: user.provider,
      image: user.image,
    });
    console.log('accessToken', accessToken);
    cookieResponse(res, accessToken);
  }

  // facebook auth login
  @Public()
  @Get('facebook/login')
  @UseGuards(FacebookGuard)
  facebookLogin() {}

  @Public()
  @UseGuards(GithubGuard)
  @Get('facebook/callback')
  async facebookCallback(@User() user: any, @Res() res: Response) {
    const accessToken = await this.authService.socialmediaLogin({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      provider: user.provider,
      image: user.image,
    });
    cookieResponse(res, accessToken);
  }

  @Public()
  @Post('registration')
  async userRegistration(
    @Body(new ValidationPipe()) data: CreateUser,
    @Res() res: Response,
  ) {
    const accessToken = await this.authService.createUserRegistration(data);
    cookieResponse(res, accessToken);
  }

  @Public()
  @Post('login')
  async login(
    @Body(new ValidationPipe()) data: LocalUserLoginDto,
    // @Res() res: Response,
  ) {
    const accessToken = await this.authService.loginUser(data);
    return { accessToken };
    // cookieResponse(res, accessToken);
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    });

    return res.status(200).json({
      message: 'Logged out successfully',
    });
  }

  // @Public()
  @Get('me')
  async getCookie(@Req() req: any, @User() user: any) {
    // console.log('-------user-----', user);
    // console.log(req.cookies);
    if (!req.cookies && !req.cookies.access_token)
      throw new UnauthorizedException('Unauthoriz User');
    return await this.authService.getUser(user.sub as string);
  }
}

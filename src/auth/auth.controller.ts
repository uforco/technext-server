import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { GoogleGuard } from './guards/googleAuth0.guard';
import { User } from './decorators/user.decorator';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { GithubGuard } from './guards/githubAuth0.guard';
import { FacebookGuard } from './guards/facebookAuth0.guard';

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
    // console.log(user);
    const result = await this.authService.socialmediaLogin({
      id: user.id,
      email: user.email,
      provider: user.provider,
      image: user.image,
    });

    res.cookie('access_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      // maxAge: 1 * 60 * 60 * 1000, // 1 hour
      maxAge: 1 * 60 * 60 * 1000, // 1 hour
    });
    res.redirect(`${process.env.FORTEND_URL}`);
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
    // console.log(user);

    const result = await this.authService.socialmediaLogin({
      id: user.id,
      email: user.email,
      provider: user.provider,
      image: user.image,
    });

    res.cookie('access_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      // maxAge: 1 * 60 * 60 * 1000, // 1 hour
      maxAge: 1 * 60 * 60 * 1000, // 1 hour
    });
    res.redirect(`${process.env.FORTEND_URL}`);
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
    const result = await this.authService.socialmediaLogin({
      id: user.id,
      email: user.email,
      provider: user.provider,
      image: user.image,
    });

    res.cookie('access_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      // maxAge: 1 * 60 * 60 * 1000, // 1 hour
      maxAge: 1 * 60 * 60 * 1000, // 1 hour
    });
    res.redirect(`${process.env.FORTEND_URL}`);
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
    if (!req.cookies && !req.cookies.access_token) return 'No cookie found';
    return await this.authService.getUser(user.sub as string);
  }
}

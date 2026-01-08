import { Body, Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { DashboardService } from './dashboard/dashboard.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dashboardService: DashboardService,
  ) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get(':url')
  async visiteUrl(
    @Param('url') url: string,
    @Res() res: Response,
  ): Promise<any> {
    const longurl = await this.dashboardService.visiteUrl(url);
    if (!longurl) res.redirect(`${process.env.FORTEND_URL}`);
    else res.redirect(longurl as string);
  }
}

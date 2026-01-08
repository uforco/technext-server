import { Body, Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { DashboardService } from './dashboard/dashboard.service';

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
  async visiteUrl(@Param('url') url: string): Promise<any> {
    return await this.dashboardService.visiteUrl(url);
  }
}

import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateUrlDto } from './dto/create-dashboard.dto';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post('create/short-url')
  create(@Body() createDashboardDto: CreateUrlDto, @User() user: any) {
    return this.dashboardService.createShortUrl({
      ...createDashboardDto,
      userId: user.sub,
    });
  }

  @Get('get-all-urls')
  findAll(@User() user: any) {
    return this.dashboardService.findAll(user.sub as string);
  }

  @Get('get-url/:id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(id);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(id);
  }
}

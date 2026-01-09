import { Injectable } from '@nestjs/common';
import { PrismaService } from './config/database/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Shorten URLs. Amplify reach.';
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    await fetch('https://goinnovior-server.onrender.com');
  }
}

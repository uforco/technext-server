import { Injectable } from '@nestjs/common';
import { PrismaService } from './config/database/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Shorten URLs. Amplify reach.';
  }
}

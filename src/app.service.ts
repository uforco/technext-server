import { Injectable } from '@nestjs/common';
import { PrismaService } from './config/database/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async geturl(url: string): Promise<string | null> {
    const users = await this.prisma.url.update({
      where: {
        shorturl: url,
      },
      data: {
        count: {
          increment: 1,
        },
      },
      select: { longurl: true },
    });
    if (!users) return null;
    return `${users.longurl}`;
  }
}

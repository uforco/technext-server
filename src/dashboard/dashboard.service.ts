import { Injectable } from '@nestjs/common';
import { GenarateUrlDto, item } from './dto/create-dashboard.dto';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string): Promise<any> {
    const data: item[] = await this.prisma.url.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        shorturl: true,
        longurl: true,
        count: true,
        createdAt: true,
      },
    });
    const fullUrl = `${process.env.BACKEND_URL}`;
    const setData = data.map((item) => ({
      ...item,
      shorturl: `${fullUrl}/${item.shorturl}`,
    }));
    return setData;
  }

  async createShortUrl(createDashboardDto: GenarateUrlDto): Promise<{
    shorturl: string;
    longurl: string;
  }> {
    const newUrl = {
      shorturl: '',
    };

    while (true) {
      const shorturl = nanoid(8);
      const exUrl = await this.prisma.url.findUnique({
        where: { shorturl },
      });
      if (!exUrl) {
        newUrl['shorturl'] = shorturl;
        break;
      }
    }

    const genarateNewUrl: {
      shorturl: string;
      longurl: string;
    } = await this.prisma.url.create({
      data: {
        userId: createDashboardDto.userId,
        longurl: createDashboardDto.url,
        shorturl: newUrl.shorturl,
      },
      select: {
        shorturl: true,
        longurl: true,
      },
    });

    return genarateNewUrl;
  }

  async findOne(id: string) {
    const data: item | null = await this.prisma.url.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        shorturl: true,
        longurl: true,
        count: true,
        createdAt: true,
      },
    });
    return data;
  }

  async remove(id: string): Promise<any> {
    return await this.prisma.url.delete({
      where: {
        id: id,
      },
    });
  }
}

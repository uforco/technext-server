import { Injectable } from '@nestjs/common';
import { GenarateUrlDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return await this.prisma.url.findMany({
      where: {
        userId: userId,
      },
    });
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
        // newUrl['longurl'] = createDashboardDto.url;
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

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}

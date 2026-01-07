import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class DashboardService {
  findAll() {
    return 'This action adds a new dashboard';
  }

  createShortUrl(createDashboardDto: CreateDashboardDto) {
    const shortCode6 = nanoid(8);
    return { longurl: createDashboardDto, shortCode6 };
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

import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
// import { Public } from './auth/decorators/public.decorator';
// import { CreateImapApiDto } from './imap-apis/dto/create-imap-api.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Public()
  // @Get('getCronJobsKK')
  // getCronJobsKK(): string {
  //   return this.imapApisService.getCronJobsKK();
  // }

  // @Public()
  // @Post('getAllInvoice')
  // getAllInvoice(@Body() body: CreateImapApiDto) {
  //   const result = this.imapApisService.loadCronJobsFromDB(body);
  //   console.log(result);
  //   return result;
  // }

  @Get('users')
  async getUsers() {
    return this.appService.getUsers();
  }
}

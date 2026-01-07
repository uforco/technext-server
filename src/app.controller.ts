import { Body, Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { Response } from 'express';
// import { Public } from './auth/decorators/public.decorator';
// import { CreateImapApiDto } from './imap-apis/dto/create-imap-api.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get(':url')
  async geturl(@Param('url') url: string, @Res() res: Response) {
    const lognurl = await this.appService.geturl(url);
    if (!lognurl) {
      return res.status(404).send('Not Found');
    }
    return res.redirect(lognurl);
  }
}

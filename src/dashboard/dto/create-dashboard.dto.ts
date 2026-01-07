import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDashboardDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'https://long.url.com/dkjghd/ftbbbbbbj',
  })
  @IsNotEmpty({ message: 'put a url required' })
  url: string;
}

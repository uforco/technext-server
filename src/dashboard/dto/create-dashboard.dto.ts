import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'https://long.url.com/dkjghd/ftbbbbbbj',
  })
  @IsNotEmpty({ message: 'put a url required' })
  url: string;
}

export class GenarateUrlDto extends CreateUrlDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '4574n56j5785b457ii',
  })
  @IsNotEmpty()
  userId: string;
}

export type item = {
  id: string;
  longurl: string;
  shorturl: string;
  count: number;
  createdAt: Date;
};

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUser {
  @ApiProperty({
    required: true,
    type: String,
    description: 'First name of the user',
    example: 'John',
  })
  @IsNotEmpty({ message: 'First name should not be empty' })
  @IsString({ message: 'First name must be a string' })
  firstName: string;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Last name of the user',
    example: 'Doe',
  })
  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  lastName?: string;

  @ApiProperty({
    required: true,
    type: String,
    example: 'user@gmail.com',
  })
  @IsString()
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    example: 'Sharif@#$12345',
  })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @Matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]).{6,}$/,
    {
      message:
        'Password must be 6-15 characters long, include at least 1 uppercase letter, 1 number, and 1 special character',
    },
  )
  @IsString()
  password: string;
}

export class LocalUserLoginDto {
  @ApiProperty({
    required: true,
    type: String,
    example: 'user@gmail.com',
  })
  @IsString()
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    example: 'Sharif@#$12345',
  })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @Matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]).{6,}$/,
    {
      message:
        'Password must be 6-15 characters long, include at least 1 uppercase letter, 1 number, and 1 special character',
    },
  )
  @IsString()
  password: string;
}

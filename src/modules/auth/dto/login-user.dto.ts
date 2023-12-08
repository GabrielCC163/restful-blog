import formatEmail from '@common/utils/format-email';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'reeves@gmail.com or jackman@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => formatEmail(value))
  readonly email: string;

  @ApiProperty({ example: '123123' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

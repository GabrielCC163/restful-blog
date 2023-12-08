import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'Nice content' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(350)
  content: string;
}

import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'How To Create a CRUD App' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({ example: 'https://media.istockphoto.com/id/abc' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: 'First, start by installing...' })
  @IsNotEmpty()
  @IsString()
  content: string;
}

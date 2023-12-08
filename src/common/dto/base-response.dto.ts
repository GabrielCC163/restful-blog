import { ApiProperty } from '@nestjs/swagger';

export const exampleDate = '2022-03-31T20:12:44.057Z';

export class BaseResponseDto {
  @ApiProperty({ example: '5654860a-4834-42cc-bd7e-01aba4de80b' })
  id: string;

  @ApiProperty({ example: exampleDate })
  createdAt: Date;

  @ApiProperty({ example: exampleDate })
  updatedAt: Date;
}

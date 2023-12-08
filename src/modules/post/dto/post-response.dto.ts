import { BaseResponseDto, exampleDate } from '@common/dto/base-response.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PostResponseDto extends BaseResponseDto {
  @ApiProperty({ example: 'How To Create a CRUD App' })
  title: string;

  @ApiPropertyOptional({ example: 'https://media.istockphoto.com/id/abc' })
  imageUrl?: string;

  @ApiProperty({ example: 'First, start by installing...' })
  content: string;

  @ApiProperty({ example: '57afc622-1cf4-4034-9fc0-d367c5fe29b3' })
  createdBy: string;
}

export class PostPaginatedResponseDto {
  @ApiProperty({
    example: [
      {
        title: 'How To Create a CRUD App',
        imageUrl: 'https://media.istockphoto.com/id/abc',
        createdBy: '57afc622-1cf4-4034-9fc0-d367c5fe29b3',
        createdAt: exampleDate,
        updatedAt: exampleDate,
      },
    ],
  })
  items: [PostResponseDto];

  @ApiProperty({ example: { totalItems: 1, itemCount: 1, itemsPerPage: 10, totalPages: 1, currentPage: 1 } })
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };

  @ApiProperty({
    example: {
      first: 'http://localhost:3000/posts?limit=10',
      previous: '',
      next: '',
      last: 'http://localhost:3000/posts?page=1&limit=10',
    },
  })
  links: {
    first: 'http://localhost:3000/posts?limit=10';
    previous: string;
    next: string;
    last: string;
  };
}

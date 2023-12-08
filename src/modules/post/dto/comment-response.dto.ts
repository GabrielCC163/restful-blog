import { BaseResponseDto } from '@common/dto/base-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseDto extends BaseResponseDto {
    @ApiProperty({ example: 'Nice content' })
    content: string;

    @ApiProperty({ example: '57afc622-1cf4-4034-9fc0-d367c5fe29b3' })
    createdBy: string;

    @ApiProperty({ example: '5654860a-4834-42cc-bd7e-01aba4de80b' })
    postId: string;
}

export class CommentPaginatedResponseDto {
    @ApiProperty({
        example: [{
            content: 'Nice content',
            createdBy: '57afc622-1cf4-4034-9fc0-d367c5fe29b3',
            postId: '5654860a-4834-42cc-bd7e-01aba4de80b'
        }]
    })
    items: [CommentResponseDto]

    @ApiProperty({ example: { totalItems: 1, itemCount: 1, itemsPerPage: 10, totalPages: 1, currentPage: 1 } })
    meta: {
        totalItems: number,
        itemCount: number,
        itemsPerPage: number,
        totalPages: number,
        currentPage: number
    }

    @ApiProperty({ example: { first: 'http://localhost:3000/posts/5654860a-4834-42cc-bd7e-01aba4de80b/comments?limit=10', previous: '', next: '', last: 'http://localhost:3000/posts/5654860a-4834-42cc-bd7e-01aba4de80b/comments?page=1&limit=10' } })
    links: {
        first: "http://localhost:3000/posts/5654860a-4834-42cc-bd7e-01aba4de80b/comments?limit=10",
        previous: string,
        next: string,
        last: string
    }
}
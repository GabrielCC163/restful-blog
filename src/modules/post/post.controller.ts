/* eslint-disable sonarjs/no-duplicate-string */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  HttpCode,
  Put,
  Request,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDTO } from '@common/dto/pagination.dto';
import { PostEntity } from './entities/post.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@config/app.config';
import { PostPaginatedResponseDto, PostResponseDto } from './dto/post-response.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CommentEntity } from './entities/comment.entity';
import { CommentPaginatedResponseDto, CommentResponseDto } from './dto/comment-response.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { IsPublic } from '@common/decorators/ispublic.decorator';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  private baseUrl: string;

  constructor(private readonly postService: PostService, private readonly configService: ConfigService<AppConfig>) {
    this.baseUrl = this.configService.get('base_url');
  }

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create post' })
  @ApiCreatedResponse({ type: PostResponseDto, description: 'Post created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  create(@Request() req, @Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postService.create(req.user.userId, createPostDto);
  }

  @ApiBearerAuth()
  @Post(':id/comments')
  @ApiOperation({ summary: 'Create comment in a post' })
  @ApiCreatedResponse({ type: CommentResponseDto, description: 'Comment created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  createComment(
    @Request() req,
    @Param('id', new ParseUUIDPipe()) postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity> {
    return this.postService.createComment(req.user.userId, postId, createCommentDto);
  }

  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a post' })
  @ApiOkResponse({ type: PostResponseDto, description: 'Post successfully updated' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  update(
    @Request() req,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postService.update(req.user.userId, id, updatePostDto);
  }

  @IsPublic()
  @Get()
  @ApiOperation({ summary: 'Get all posts', description: 'Allows to filter by post title and/or userId' })
  @ApiOkResponse({ type: PostPaginatedResponseDto, description: 'Paginated response of all posts' })
  @ApiNotFoundResponse({ description: 'Posts not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAll(@Query() pagination: PaginationDTO): Promise<Pagination<PostEntity>> {
    pagination.route = `${this.baseUrl}/posts`;
    return this.postService.findAll(pagination);
  }

  @IsPublic()
  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiOkResponse({ type: PostResponseDto, description: 'Post found' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<PostEntity> {
    return this.postService.findOne(id);
  }

  @IsPublic()
  @Get(':id/comments')
  @ApiOperation({ summary: 'Get post comments', description: 'Allows to filter by content and/or userId' })
  @ApiOkResponse({ type: CommentPaginatedResponseDto, description: 'Paginated response of all comments from a post' })
  @ApiNotFoundResponse({ description: 'Comments not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAllPostComments(
    @Param('id', new ParseUUIDPipe()) postId: string,
    @Query() pagination: PaginationDTO,
  ): Promise<Pagination<CommentEntity>> {
    pagination.route = `${this.baseUrl}/posts/${postId}/comments`;
    return this.postService.findAllPostComments(postId, pagination);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Post removed' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async remove(@Request() req, @Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.postService.remove(req.user.userId, id);
  }
}

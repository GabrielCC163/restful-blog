import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDTO } from '@common/dto/pagination.dto';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) { }

  async create(userId: string, createPostDto: CreatePostDto): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ where: { title: createPostDto.title } });
    if (post) throw new BadRequestException(`Post already exists with the same title`);

    const newPost = await this.postRepository.save({
      ...createPostDto,
      createdBy: userId
    });
    return newPost;
  }

  createComment(userId: string, postId: string, createCommentDto: CreateCommentDto): Promise<CommentEntity> {
    return this.commentRepository.save({
      ...createCommentDto,
      createdBy: userId,
      postId,
    })
  }

  async update(userId: string, id: string, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const post = await this.postRepository.findOneBy({ id, createdBy: userId });
    if (!post) throw new NotFoundException('Post not found');
    await this.postRepository.update({ id }, updatePostDto);
    return this.postRepository.findOneBy({ id });
  }

  async findAll(pagination: PaginationDTO): Promise<Pagination<PostEntity>> {
    const { page, limit, route, search, userId } = pagination;
    const options: IPaginationOptions = { page, limit, route };
    const searchOptions = {
      where: {},
      order: { createdAt: 'DESC' },
      join: {
        alias: 'post',
        innerJoinAndSelect: {
          user: 'post.user',
        }
      }
    } as any;

    if (search?.trim()) searchOptions.where['title'] = ILike(`%${search.trim()}%`);
    if (userId) searchOptions.where['createdBy'] = userId;

    const result = await paginate<PostEntity>(this.postRepository, options, searchOptions);
    if (!result?.items?.length) throw new NotFoundException('No posts to list')
    return result;
  }

  async findOne(id: string): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ where: { id }, relations: { user: true } },);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async findAllPostComments(postId: string, pagination: PaginationDTO): Promise<Pagination<CommentEntity>> {
    const { page, limit, route, search, userId } = pagination;
    const options: IPaginationOptions = { page, limit, route };
    const searchOptions = {
      where: {},
      order: { createdAt: 'DESC' },
      join: {
        alias: 'comment',
        innerJoinAndSelect: {
          user: 'comment.user'
        }
      }
    } as any;

    searchOptions.where['postId'] = postId;
    if (search?.trim()) searchOptions.where['content'] = ILike(`%${search.trim()}%`);
    if (userId) searchOptions.where['createdBy'] = userId;

    const result = await paginate<CommentEntity>(this.commentRepository, options, searchOptions);
    if (!result?.items?.length) throw new NotFoundException('No comments to list')
    return result;
  }

  async remove(userId: string, id: string): Promise<void> {
    const post = await this.postRepository.findOneBy({ id, createdBy: userId });
    if (!post) throw new NotFoundException('Post not found');
    await this.postRepository.delete(id);
  }
}

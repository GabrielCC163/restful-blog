import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { CommentEntity } from './entities/comment.entity';
import { LogService } from '@modules/log/log.service';
import { LogEntity } from '@modules/log/entities/log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, CommentEntity, LogEntity])],
  controllers: [PostController],
  providers: [PostService, LogService],
})
export class PostModule {}

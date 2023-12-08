import { BaseEntity } from '@database/base.entity';
import { UserEntity } from '@modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('comments')
export class CommentEntity extends BaseEntity {
  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'createdBy' })
  user: UserEntity;

  @Column({ type: 'uuid' })
  createdBy: string;

  @ManyToOne(() => PostEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'postId' })
  post: PostEntity;

  @Column({ type: 'uuid' })
  postId: string;
}

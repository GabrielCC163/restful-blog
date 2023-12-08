import { BaseEntity } from '@database/base.entity';
import { UserEntity } from '@modules/user/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('posts')
export class PostEntity extends BaseEntity {
  @Column()
  @Index({ unique: true })
  title: string;

  @Column({ nullable: true })
  imageUrl?: string;

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
}

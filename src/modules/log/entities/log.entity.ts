import { BaseEntity } from '@database/base.entity';
import { UserEntity } from '@modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('logs')
export class LogEntity extends BaseEntity {
  @Column()
  action: string;

  @Column()
  entity: string;

  @Column()
  entityId: string;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'createdBy' })
  user: UserEntity;

  @Column({ type: 'uuid' })
  createdBy: string;

  @Column({ type: 'jsonb', nullable: true })
  snapshot?: Record<string, any>;
}

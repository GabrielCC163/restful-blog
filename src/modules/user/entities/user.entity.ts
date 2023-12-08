import { BaseEntity } from '@database/base.entity';
import { IsEmail } from 'class-validator';
import { Column, Entity, Index } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'text', select: false })
  password: string;
}

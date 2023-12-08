import * as bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from "typeorm";
import { UserEntity } from '@modules/user/entities/user.entity';

export class Seed1702061125775 implements MigrationInterface {
    name = 'Seed1702061125775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const hashedPass = await bcrypt.hash('123123', +process.env.SALT_ROUNDS);
        await queryRunner.manager.save(
            queryRunner.manager.create<UserEntity>(UserEntity, {
                name: 'Keanu Reeves',
                email: 'reeves@gmail.com',
                password: hashedPass,
            })
        );

        await queryRunner.manager.save(
            queryRunner.manager.create<UserEntity>(UserEntity, {
                name: 'Hugh Jackman',
                email: 'jackman@gmail.com',
                password: hashedPass,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "users"`);
    }
}

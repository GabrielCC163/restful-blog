import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCommentTable1702054837751 implements MigrationInterface {
  name = 'CreateCommentTable1702054837751';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "content" text NOT NULL, "createdBy" uuid NOT NULL, "postId" uuid NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_447dfbb1cb1ca1176d780ee6f16" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
    await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_447dfbb1cb1ca1176d780ee6f16"`);
    await queryRunner.query(`DROP TABLE "comments"`);
  }
}

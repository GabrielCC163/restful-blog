import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostTable1702054672896 implements MigrationInterface {
  name = 'CreatePostEntity1702054672896';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "imageUrl" character varying, "content" text NOT NULL, "createdBy" uuid NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e28aa0c4114146bfb1567bfa9a" ON "posts" ("title") `);
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_43ae5b59527654c45cc0355324c" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_43ae5b59527654c45cc0355324c"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_e28aa0c4114146bfb1567bfa9a"`);
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}

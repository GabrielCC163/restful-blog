import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLogTable1702076850903 implements MigrationInterface {
  name = 'CreateLogTable1702076850903';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "action" character varying NOT NULL, "entity" character varying NOT NULL, "entityId" character varying NOT NULL, "createdBy" uuid NOT NULL, "snapshot" jsonb, CONSTRAINT "PK_fb1b805f2f7795de79fa69340ba" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "logs" ADD CONSTRAINT "FK_44d9d7225cbe6e248376dd413d4" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "logs" DROP CONSTRAINT "FK_44d9d7225cbe6e248376dd413d4"`);
    await queryRunner.query(`DROP TABLE "logs"`);
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1692372434469 implements MigrationInterface {
  name = "latestmigration1692372434469";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "studiotemplate" ("id" SERIAL NOT NULL, "type" character varying(250) NOT NULL, "description" text NOT NULL, "fields" jsonb NOT NULL DEFAULT \'{}\', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "agentId" integer, CONSTRAINT "PK_9ae90035175c05186330d9ae5f9" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "studiotemplate" ADD CONSTRAINT "FK_f6bd18b044b1371182c9be2b5e1" FOREIGN KEY ("agentId") REFERENCES "tblagent"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "studiotemplate" DROP CONSTRAINT "FK_f6bd18b044b1371182c9be2b5e1"',
    );
    await queryRunner.query('DROP TABLE "studiotemplate"');
  }
}

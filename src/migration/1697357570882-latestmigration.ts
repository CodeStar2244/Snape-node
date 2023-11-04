import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1697357570882 implements MigrationInterface {
  name = "latestmigration1697357570882";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "studioquotation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "currency" character varying NOT NULL, "subject" character varying, "status" character varying NOT NULL DEFAULT 'Draft', "invoiceDetails" jsonb NOT NULL DEFAULT '{}', "subTotalAmount" integer, "totalAmount" integer, "discount" integer, "tax" integer, "notes" character varying, "validFor" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "clientId" integer, "agentId" integer, CONSTRAINT "PK_b45a5c6127b16b4c818c688ad85" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "studioquotation" ADD CONSTRAINT "FK_27ba4984a1e8c89e4f3ec7288a8" FOREIGN KEY ("clientId") REFERENCES "studioclient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "studioquotation" ADD CONSTRAINT "FK_de7855a1e101b6eb2ab7fa9d85b" FOREIGN KEY ("agentId") REFERENCES "tblagent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "studioquotation" DROP CONSTRAINT "FK_de7855a1e101b6eb2ab7fa9d85b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "studioquotation" DROP CONSTRAINT "FK_27ba4984a1e8c89e4f3ec7288a8"`,
    );
    await queryRunner.query(`DROP TABLE "studioquotation"`);
  }
}

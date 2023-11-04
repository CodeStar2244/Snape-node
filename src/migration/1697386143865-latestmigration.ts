import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1697386143865 implements MigrationInterface {
  name = "latestmigration1697386143865";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "studiobooking" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "notes" character varying, "startDate" TIMESTAMP, "endDate" TIMESTAMP, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "clientId" integer, "agentId" integer, CONSTRAINT "PK_22df241fe153acf88476517e2f6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "studiobooking" ADD CONSTRAINT "FK_fffa9709fcd60435a7df5c05e86" FOREIGN KEY ("clientId") REFERENCES "studioclient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "studiobooking" ADD CONSTRAINT "FK_64840340cb93c461ba8c4150f18" FOREIGN KEY ("agentId") REFERENCES "tblagent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "studiobooking" DROP CONSTRAINT "FK_64840340cb93c461ba8c4150f18"`,
    );
    await queryRunner.query(
      `ALTER TABLE "studiobooking" DROP CONSTRAINT "FK_fffa9709fcd60435a7df5c05e86"`,
    );
    await queryRunner.query(`DROP TABLE "studiobooking"`);
  }
}

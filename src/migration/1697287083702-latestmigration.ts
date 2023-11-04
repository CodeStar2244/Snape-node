import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1697287083702 implements MigrationInterface {
  name = "latestmigration1697287083702";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" ADD "clientId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" ALTER COLUMN "status" SET DEFAULT 'Draft'`,
    );
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" ADD CONSTRAINT "FK_8b9d8b131c1e2cb3dde00f401ec" FOREIGN KEY ("clientId") REFERENCES "studioclient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" DROP CONSTRAINT "FK_8b9d8b131c1e2cb3dde00f401ec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" DROP COLUMN "clientId"`,
    );
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Latestmigration1699344435487 implements MigrationInterface {
  name = "Latestmigration1699344435487";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" ADD "currentOutstanding" integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" DROP COLUMN "currentOutstanding"`,
    );
  }
}

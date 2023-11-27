import { MigrationInterface, QueryRunner } from "typeorm";

export class Latestmigration1701114482990 implements MigrationInterface {
  name = "Latestmigration1701114482990";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "studioquotation" ALTER COLUMN "name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "studioquotation" ALTER COLUMN "currency" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "studioquotation" ALTER COLUMN "currency" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "studioquotation" ALTER COLUMN "name" SET NOT NULL`,
    );
  }
}

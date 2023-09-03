import { MigrationInterface, QueryRunner } from "typeorm";

export class Latestmigration1693736312335 implements MigrationInterface {
  name = "Latestmigration1693736312335";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "portFolioVideoLinks" DROP COLUMN "name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "portFolioVideoLinks" ADD CONSTRAINT "UQ_ba48a26d548ce7e49e0fc430be9" UNIQUE ("url")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tblbooking" ALTER COLUMN "transportationcharge" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "tblbooking" ALTER COLUMN "refundamount" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "tblbooking" ALTER COLUMN "cancellationfee" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "tblbooking" ALTER COLUMN "agentrating" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "tblbooking" ALTER COLUMN "clientrating" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "tblbooking" ALTER COLUMN "totalamount" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "tblbooking" ALTER COLUMN "tax" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "tblbooking" ALTER COLUMN "discount" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "tblbooking" ALTER COLUMN "subtotal" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "portFolioVideoLinks" DROP CONSTRAINT "UQ_ba48a26d548ce7e49e0fc430be9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "portFolioVideoLinks" ADD "name" character varying NOT NULL`,
    );
  }
}

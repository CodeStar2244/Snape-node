import { MigrationInterface, QueryRunner } from "typeorm";

export class Latestmigration1699099469172 implements MigrationInterface {
  name = "Latestmigration1699099469172";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "plans" ADD "storageInPlan" integer NOT NULL DEFAULT '3072'`,
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
    await queryRunner.query(`ALTER TABLE "plans" DROP COLUMN "storageInPlan"`);
  }
}

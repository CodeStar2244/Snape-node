import { MigrationInterface, QueryRunner } from "typeorm";

export class Latestmigration1699101774082 implements MigrationInterface {
  name = "Latestmigration1699101774082";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" ALTER COLUMN "status" SET DEFAULT 'ongoing'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" ALTER COLUMN "status" SET DEFAULT 'Pending'`,
    );
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
  }
}

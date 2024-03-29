import { MigrationInterface, QueryRunner } from "typeorm";

export class Latestmigration1702045488138 implements MigrationInterface {
  name = "Latestmigration1702045488138";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "plans" DROP COLUMN "code"`);
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
      `ALTER TABLE "plans" ADD "code" character varying NOT NULL`,
    );
  }
}

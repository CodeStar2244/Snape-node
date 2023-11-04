import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1697287253948 implements MigrationInterface {
  name = "latestmigration1697287253948";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" ALTER COLUMN "subject" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" ALTER COLUMN "subTotalAmount" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" ALTER COLUMN "totalAmount" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" ALTER COLUMN "notes" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" ALTER COLUMN "paymentDue" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" ALTER COLUMN "dueOnReceipt" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" ALTER COLUMN "dueOnReceipt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" ALTER COLUMN "paymentDue" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" ALTER COLUMN "notes" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" ALTER COLUMN "totalAmount" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" ALTER COLUMN "subTotalAmount" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "studioinvoice" ALTER COLUMN "subject" SET NOT NULL`,
    );
  }
}

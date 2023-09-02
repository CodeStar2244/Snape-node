import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1688822552142 implements MigrationInterface {
  name = "latestmigration1688822552142";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "files" ADD "compressedKey" character varying',
    );
    await queryRunner.query(
      'ALTER TABLE "files" ADD "compressedCdnUrl" character varying',
    );
    await queryRunner.query(
      'ALTER TABLE "files" ADD "compressedImageSize" double precision DEFAULT \'0\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "tblbooking" ALTER COLUMN "transportationcharge" SET DEFAULT \'0\'',
    );
    await queryRunner.query(
      'ALTER TABLE "tblbooking" ALTER COLUMN "refundamount" SET DEFAULT \'0\'',
    );
    await queryRunner.query(
      'ALTER TABLE "tblbooking" ALTER COLUMN "cancellationfee" SET DEFAULT \'0\'',
    );
    await queryRunner.query(
      'ALTER TABLE "tblbooking" ALTER COLUMN "agentrating" SET DEFAULT \'0\'',
    );
    await queryRunner.query(
      'ALTER TABLE "tblbooking" ALTER COLUMN "clientrating" SET DEFAULT \'0\'',
    );
    await queryRunner.query(
      'ALTER TABLE "tblbooking" ALTER COLUMN "totalamount" SET DEFAULT \'0\'',
    );
    await queryRunner.query(
      'ALTER TABLE "tblbooking" ALTER COLUMN "tax" SET DEFAULT \'0\'',
    );
    await queryRunner.query(
      'ALTER TABLE "tblbooking" ALTER COLUMN "discount" SET DEFAULT \'0\'',
    );
    await queryRunner.query(
      'ALTER TABLE "tblbooking" ALTER COLUMN "subtotal" SET DEFAULT \'0\'',
    );
    await queryRunner.query(
      'ALTER TABLE "files" DROP COLUMN "compressedImageSize"',
    );
    await queryRunner.query(
      'ALTER TABLE "files" DROP COLUMN "compressedCdnUrl"',
    );
    await queryRunner.query('ALTER TABLE "files" DROP COLUMN "compressedKey"');
  }
}

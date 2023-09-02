import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1690099458548 implements MigrationInterface {
  name = "latestmigration1690099458548";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "studioclient" ALTER COLUMN "profileUrl" SET DEFAULT \'https://snape-buckets.b-cdn.net/default/userprofile.png\'',
    );
    await queryRunner.query(
      'ALTER TABLE "studiospeciality" ALTER COLUMN "imageUrl" SET DEFAULT \'https://snape-buckets.b-cdn.net/default/userprofile.png\'',
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
      'ALTER TABLE "studiospeciality" ALTER COLUMN "imageUrl" SET DEFAULT \'default/special.png\'',
    );
    await queryRunner.query(
      'ALTER TABLE "studioclient" ALTER COLUMN "profileUrl" SET DEFAULT \'default/userprofile.png\'',
    );
  }
}

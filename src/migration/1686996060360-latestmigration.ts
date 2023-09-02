import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1686996060360 implements MigrationInterface {
  name = "latestmigration1686996060360";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "enterPriseClient" DROP COLUMN "firstname"',
    );
    await queryRunner.query(
      'ALTER TABLE "enterPriseClient" DROP COLUMN "lastname"',
    );
    await queryRunner.query(
      'ALTER TABLE "enterPriseClient" ADD "name" character varying(100)',
    );
    await queryRunner.query(
      'ALTER TABLE "enterPriseClient" DROP COLUMN "createdAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "enterPriseClient" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "enterPriseClient" DROP COLUMN "updatedAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "enterPriseClient" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "enterPriseClient" ADD CONSTRAINT "FK_0f77f0a7240e46f56a011fbcec7" FOREIGN KEY ("roleid") REFERENCES "tblrole"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "enterPriseClient" DROP CONSTRAINT "FK_0f77f0a7240e46f56a011fbcec7"',
    );
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
      'ALTER TABLE "enterPriseClient" DROP COLUMN "updatedAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "enterPriseClient" ADD "updatedAt" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "enterPriseClient" DROP COLUMN "createdAt"',
    );
    await queryRunner.query(
      'ALTER TABLE "enterPriseClient" ADD "createdAt" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "agentsettings" ALTER COLUMN "totalStorage" TYPE double precision',
    );
    await queryRunner.query(
      'ALTER TABLE "agentsettings" ALTER COLUMN "assets" TYPE double precision',
    );
    await queryRunner.query(
      'ALTER TABLE "agentsettings" ALTER COLUMN "storage" TYPE double precision',
    );
    await queryRunner.query(
      'ALTER TABLE "enterPriseClient" DROP COLUMN "name"',
    );
    await queryRunner.query(
      'ALTER TABLE "enterPriseClient" ADD "lastname" character varying(100)',
    );
    await queryRunner.query(
      'ALTER TABLE "enterPriseClient" ADD "firstname" character varying(100)',
    );
  }
}

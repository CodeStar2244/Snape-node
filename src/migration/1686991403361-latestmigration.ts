import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1686991403361 implements MigrationInterface {
  name = "latestmigration1686991403361";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "enterPriseClient" ("id" SERIAL NOT NULL, "firstname" character varying(100), "lastname" character varying(100), "email" character varying(150), "password" character varying(100), "countrycode" character varying(10), "phone" character varying(30), "otpverification" boolean DEFAULT false, "facebookid" character varying(400), "googleid" character varying(400), "fcmtoken" character varying(500), "latitude" double precision, "longitude" double precision, "isactive" boolean DEFAULT true, "registrationNumber" character varying NOT NULL, "userName" character varying NOT NULL, "gender" integer, "birthdate" character varying(30), "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "roleid" integer, CONSTRAINT "UQ_8f21b7f4ced2dc4d1a28f6112df" UNIQUE ("phone"), CONSTRAINT "PK_73bddcb3e35e17d8ef022985b4a" PRIMARY KEY ("id"))',
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
      'ALTER TABLE "agentsettings" ALTER COLUMN "totalStorage" TYPE double precision',
    );
    await queryRunner.query(
      'ALTER TABLE "agentsettings" ALTER COLUMN "assets" TYPE double precision',
    );
    await queryRunner.query(
      'ALTER TABLE "agentsettings" ALTER COLUMN "storage" TYPE double precision',
    );
    await queryRunner.query('DROP TABLE "enterPriseClient"');
  }
}

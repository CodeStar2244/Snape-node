import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1687017158809 implements MigrationInterface {
  name = "latestmigration1687017158809";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"enterpriseassets_type_enum\" AS ENUM('CELL_PHONE', 'CAMERA', 'SCREEN', 'PRINTER')",
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"enterpriseassets_status_enum\" AS ENUM('Active', 'For Sale', 'Lost', 'For Rent')",
    );
    await queryRunner.query(
      'CREATE TABLE "enterpriseassets" ("id" SERIAL NOT NULL, "nickName" character varying NOT NULL, "deviceID" character varying NOT NULL, "deviceAmount" double precision NOT NULL DEFAULT \'0\', "type" "public"."enterpriseassets_type_enum" NOT NULL DEFAULT \'CAMERA\', "status" "public"."enterpriseassets_status_enum" NOT NULL DEFAULT \'Active\', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "agentId" integer, CONSTRAINT "PK_06ef5b8576a9f6ac993bf64aff4" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "enterpriseassets" ADD CONSTRAINT "FK_31bfba9782dda0a86c4dadf0bd8" FOREIGN KEY ("agentId") REFERENCES "enterPriseClient"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "enterpriseassets" DROP CONSTRAINT "FK_31bfba9782dda0a86c4dadf0bd8"',
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
    await queryRunner.query('DROP TABLE "enterpriseassets"');
    await queryRunner.query(
      'DROP TYPE "public"."enterpriseassets_status_enum"',
    );
    await queryRunner.query('DROP TYPE "public"."enterpriseassets_type_enum"');
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Latestmigration1693659846265 implements MigrationInterface {
  name = "Latestmigration1693659846265";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"portFolioVideoLinks_type_enum\" AS ENUM('YOUTUBE', 'VIMEO')",
    );
    await queryRunner.query(
      'CREATE TABLE "portFolioVideoLinks" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "iframe" character varying NOT NULL, "type" "public"."portFolioVideoLinks_type_enum" NOT NULL DEFAULT \'YOUTUBE\', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "portfolioId" integer, CONSTRAINT "PK_04b70e2696089d93f30d5650ff5" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "portFolioVideoLinks" ADD CONSTRAINT "FK_88d1391dd679dc1f89638966a38" FOREIGN KEY ("portfolioId") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "portFolioVideoLinks" DROP CONSTRAINT "FK_88d1391dd679dc1f89638966a38"',
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
    await queryRunner.query('DROP TABLE "portFolioVideoLinks"');
    await queryRunner.query(
      'DROP TYPE "public"."portFolioVideoLinks_type_enum"',
    );
  }
}

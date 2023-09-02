import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1687017396287 implements MigrationInterface {
  name = "latestmigration1687017396287";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "enterpriseassets" DROP CONSTRAINT "FK_31bfba9782dda0a86c4dadf0bd8"',
    );
    await queryRunner.query(
      'ALTER TABLE "enterpriseassets" RENAME COLUMN "agentId" TO "clientId"',
    );
    await queryRunner.query(
      'ALTER TABLE "enterpriseassets" ADD CONSTRAINT "FK_129afc2351c33e559ad0792f8ec" FOREIGN KEY ("clientId") REFERENCES "enterPriseClient"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "enterpriseassets" DROP CONSTRAINT "FK_129afc2351c33e559ad0792f8ec"',
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
      'ALTER TABLE "enterpriseassets" RENAME COLUMN "clientId" TO "agentId"',
    );
    await queryRunner.query(
      'ALTER TABLE "enterpriseassets" ADD CONSTRAINT "FK_31bfba9782dda0a86c4dadf0bd8" FOREIGN KEY ("agentId") REFERENCES "enterPriseClient"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }
}

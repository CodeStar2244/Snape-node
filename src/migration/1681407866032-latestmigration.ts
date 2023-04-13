import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1681407866032 implements MigrationInterface {
    name = 'latestmigration1681407866032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_2e847f9d0120b4ca0d7269dda0e"`);
        await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "imeiNumber"`);
        await queryRunner.query(`ALTER TABLE "assets" ADD "nickName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "assets" ADD "deviceID" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "assets" ADD "deviceAmount" integer NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."assets_type_enum" AS ENUM('CELL_PHONE', 'CAMERA', 'SCREEN', 'PRINTER')`);
        await queryRunner.query(`ALTER TABLE "assets" ADD "type" "public"."assets_type_enum" NOT NULL DEFAULT 'CAMERA'`);
        await queryRunner.query(`ALTER TABLE "assets" ALTER COLUMN "status" SET DEFAULT 'Active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "transportationcharge" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "refundamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "cancellationfee" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "agentrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "clientrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "totalamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "tax" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "discount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "subtotal" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "assets" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."assets_type_enum"`);
        await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "deviceAmount"`);
        await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "deviceID"`);
        await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "nickName"`);
        await queryRunner.query(`ALTER TABLE "assets" ADD "imeiNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "assets" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "assets" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "assets" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "assets" ADD CONSTRAINT "FK_2e847f9d0120b4ca0d7269dda0e" FOREIGN KEY ("categoryId") REFERENCES "assetCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

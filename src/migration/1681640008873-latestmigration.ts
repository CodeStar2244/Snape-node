import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1681640008873 implements MigrationInterface {
    name = 'latestmigration1681640008873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agentsettings" ADD "totalStorage" double precision NOT NULL DEFAULT '3072'`);
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
        await queryRunner.query(`ALTER TABLE "agentsettings" ALTER COLUMN "assets" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "agentsettings" ALTER COLUMN "storage" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "agentsettings" DROP COLUMN "totalStorage"`);
    }

}

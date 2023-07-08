import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1688829949378 implements MigrationInterface {
    name = 'latestmigration1688829949378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enterprisefiles" ADD "compressedKey" character varying`);
        await queryRunner.query(`ALTER TABLE "enterprisefiles" ADD "compressedCdnUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "enterprisefiles" ADD "compressedImageSize" double precision DEFAULT '0'`);
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
        await queryRunner.query(`ALTER TABLE "enterprisefiles" DROP COLUMN "compressedImageSize"`);
        await queryRunner.query(`ALTER TABLE "enterprisefiles" DROP COLUMN "compressedCdnUrl"`);
        await queryRunner.query(`ALTER TABLE "enterprisefiles" DROP COLUMN "compressedKey"`);
    }

}

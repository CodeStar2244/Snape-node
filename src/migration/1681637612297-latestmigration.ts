import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1681637612297 implements MigrationInterface {
    name = 'latestmigration1681637612297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agentsettings" ALTER COLUMN "storage" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "agentsettings" ALTER COLUMN "assets" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "cdnUrl" SET NOT NULL`);
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
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "cdnUrl" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "agentsettings" ALTER COLUMN "assets" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "agentsettings" ALTER COLUMN "storage" SET NOT NULL`);
    }

}

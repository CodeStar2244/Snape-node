import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1681633843735 implements MigrationInterface {
    name = 'latestmigration1681633843735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" ADD "cdnUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "coverPhoto" SET DEFAULT 'https://snape-buckets.b-cdn.net/collectionphoto.jpg'`);
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
        await queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "coverPhoto" SET DEFAULT 'https://s3.amazonaws.com/dev-media.snape.com/collectionphoto.jpg'`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "cdnUrl"`);
    }

}

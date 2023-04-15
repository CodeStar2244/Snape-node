import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1681560841033 implements MigrationInterface {
    name = 'latestmigration1681560841033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agentSettings" ("id" SERIAL NOT NULL, "storage" double precision NOT NULL DEFAULT '0', "assets" double precision NOT NULL DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "agentId" integer, CONSTRAINT "REL_85236aec09b6abdb8f9cf93728" UNIQUE ("agentId"), CONSTRAINT "PK_dcd276aad49e7ab185c98ce0c4b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "deviceAmount"`);
        await queryRunner.query(`ALTER TABLE "assets" ADD "deviceAmount" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "agentSettings" ADD CONSTRAINT "FK_85236aec09b6abdb8f9cf93728f" FOREIGN KEY ("agentId") REFERENCES "tblagent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agentSettings" DROP CONSTRAINT "FK_85236aec09b6abdb8f9cf93728f"`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "transportationcharge" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "refundamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "cancellationfee" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "agentrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "clientrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "totalamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "tax" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "discount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "subtotal" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "deviceAmount"`);
        await queryRunner.query(`ALTER TABLE "assets" ADD "deviceAmount" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "agentSettings"`);
    }

}

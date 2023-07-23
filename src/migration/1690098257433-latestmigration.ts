import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1690098257433 implements MigrationInterface {
    name = 'latestmigration1690098257433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "studiospeciality" ("id" SERIAL NOT NULL, "name" character varying(250) NOT NULL, "imageUrl" text NOT NULL DEFAULT 'default/special.png', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "agentId" integer, CONSTRAINT "PK_5c048fbfe27e2eb6e29ceb2f968" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "studioclient" ADD "profileUrl" text NOT NULL DEFAULT 'default/userprofile.png'`);
        await queryRunner.query(`ALTER TABLE "enterpriseBooking" ALTER COLUMN "bookingDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studiospeciality" ADD CONSTRAINT "FK_06f92cadb07840b9738a44b16f4" FOREIGN KEY ("agentId") REFERENCES "tblagent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "studiospeciality" DROP CONSTRAINT "FK_06f92cadb07840b9738a44b16f4"`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "transportationcharge" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "refundamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "cancellationfee" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "agentrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "clientrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "totalamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "tax" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "discount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "subtotal" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "enterpriseBooking" ALTER COLUMN "bookingDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studioclient" DROP COLUMN "profileUrl"`);
        await queryRunner.query(`DROP TABLE "studiospeciality"`);
    }

}

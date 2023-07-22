import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1690032712637 implements MigrationInterface {
    name = 'latestmigration1690032712637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "enterpriseBooking" ("id" SERIAL NOT NULL, "bookingDate" TIMESTAMP, "hours" integer, "bookingStartDateTime" TIMESTAMP NOT NULL, "bookingEndDateTime" TIMESTAMP NOT NULL, "address1" character varying(500) NOT NULL, "address2" character varying(500), "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "bookingstatusid" integer NOT NULL, "clientrating" integer, "agentrating" integer, "speciality" integer NOT NULL, "agentcancellationreason" character varying(500), "clientcancellationreason" character varying(500), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "head" character varying(100), "message" character varying(500), "medialink" character varying(200) DEFAULT '', "clientId" integer, "agentId" integer, CONSTRAINT "PK_dce6ab1b491b64a067da5dd717c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "enterpriseBooking" ADD CONSTRAINT "FK_badeea515064eb4db16e3b2f4d3" FOREIGN KEY ("clientId") REFERENCES "enterPriseClient"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "enterpriseBooking" ADD CONSTRAINT "FK_80c62304e18a58a0019886b3135" FOREIGN KEY ("agentId") REFERENCES "tblagent"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enterpriseBooking" DROP CONSTRAINT "FK_80c62304e18a58a0019886b3135"`);
        await queryRunner.query(`ALTER TABLE "enterpriseBooking" DROP CONSTRAINT "FK_badeea515064eb4db16e3b2f4d3"`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "transportationcharge" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "refundamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "cancellationfee" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "agentrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "clientrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "totalamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "tax" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "discount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "subtotal" SET DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE "enterpriseBooking"`);
    }

}

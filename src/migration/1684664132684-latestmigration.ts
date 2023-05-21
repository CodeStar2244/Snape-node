import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1684664132684 implements MigrationInterface {
    name = 'latestmigration1684664132684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "enterpricesettings" ("id" SERIAL NOT NULL, "registrationNumber" character varying NOT NULL, "userName" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "agentId" integer, CONSTRAINT "REL_d2ff9e3050d38d752625876605" UNIQUE ("agentId"), CONSTRAINT "PK_cf330db5ac9cb5293fe32a8f151" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "zipCreated"`);
        await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "zipSize"`);
        await queryRunner.query(`CREATE TYPE "public"."agentsettings_type_enum" AS ENUM('ENTERPRISE', 'STUDIO')`);
        await queryRunner.query(`ALTER TABLE "agentsettings" ADD "type" "public"."agentsettings_type_enum" NOT NULL DEFAULT 'STUDIO'`);
        await queryRunner.query(`ALTER TABLE "enterpricesettings" ADD CONSTRAINT "FK_d2ff9e3050d38d7526258766053" FOREIGN KEY ("agentId") REFERENCES "tblagent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enterpricesettings" DROP CONSTRAINT "FK_d2ff9e3050d38d7526258766053"`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "transportationcharge" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "refundamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "cancellationfee" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "agentrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "clientrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "totalamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "tax" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "discount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "subtotal" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "agentsettings" ALTER COLUMN "totalStorage" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "agentsettings" ALTER COLUMN "assets" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "agentsettings" ALTER COLUMN "storage" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "agentsettings" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."agentsettings_type_enum"`);
        await queryRunner.query(`ALTER TABLE "collections" ADD "zipSize" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "collections" ADD "zipCreated" boolean DEFAULT false`);
        await queryRunner.query(`DROP TABLE "enterpricesettings"`);
    }

}

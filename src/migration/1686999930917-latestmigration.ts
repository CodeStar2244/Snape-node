import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1686999930917 implements MigrationInterface {
    name = 'latestmigration1686999930917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "enterprisesettings" ("id" SERIAL NOT NULL, "storage" double precision DEFAULT '0', "assets" double precision DEFAULT '0', "totalStorage" double precision NOT NULL DEFAULT '3072', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "clientId" integer, CONSTRAINT "REL_260f1461d431d2b07a6140bba1" UNIQUE ("clientId"), CONSTRAINT "PK_a5532bc37b20c632e662a1fd306" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "agentsettings" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."agentsettings_type_enum"`);
        await queryRunner.query(`ALTER TABLE "enterprisesettings" ADD CONSTRAINT "FK_260f1461d431d2b07a6140bba18" FOREIGN KEY ("clientId") REFERENCES "enterPriseClient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enterprisesettings" DROP CONSTRAINT "FK_260f1461d431d2b07a6140bba18"`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "transportationcharge" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "refundamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "cancellationfee" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "agentrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "clientrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "totalamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "tax" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "discount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "subtotal" SET DEFAULT '0'`);
        await queryRunner.query(`CREATE TYPE "public"."agentsettings_type_enum" AS ENUM('ENTERPRISE', 'STUDIO')`);
        await queryRunner.query(`ALTER TABLE "agentsettings" ADD "type" "public"."agentsettings_type_enum" NOT NULL DEFAULT 'STUDIO'`);
        await queryRunner.query(`DROP TABLE "enterprisesettings"`);
    }

}

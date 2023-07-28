import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1690462436435 implements MigrationInterface {
    name = 'latestmigration1690462436435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."portfolios_status_enum" AS ENUM('PUBLISH', 'HIDDEN')`);
        await queryRunner.query(`CREATE TABLE "portfolios" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "status" "public"."portfolios_status_enum" NOT NULL DEFAULT 'HIDDEN', "photos" integer DEFAULT '0', "videos" integer DEFAULT '0', "coverPhoto" character varying DEFAULT 'https://snape-buckets.b-cdn.net/collectionphoto.jpg', "size" double precision DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "agentId" integer, CONSTRAINT "REL_272be8d6991677ed314c0d3237" UNIQUE ("agentId"), CONSTRAINT "PK_488aa6e9b219d1d9087126871ae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."portfolioFiles_type_enum" AS ENUM('PHOTO', 'VIDEO')`);
        await queryRunner.query(`CREATE TABLE "portfolioFiles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "cdnUrl" character varying NOT NULL, "compressedKey" character varying, "compressedCdnUrl" character varying, "compressedImageSize" double precision DEFAULT '0', "key" character varying NOT NULL, "size" double precision NOT NULL DEFAULT '0', "height" integer NOT NULL, "width" integer NOT NULL, "type" "public"."portfolioFiles_type_enum" NOT NULL DEFAULT 'PHOTO', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "portfolioId" integer, CONSTRAINT "PK_e6251e2bec91d76a94da491d661" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "portfolios" ADD CONSTRAINT "FK_272be8d6991677ed314c0d32374" FOREIGN KEY ("agentId") REFERENCES "tblagent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolioFiles" ADD CONSTRAINT "FK_bd98b4ec8b541de53325d946684" FOREIGN KEY ("portfolioId") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolioFiles" DROP CONSTRAINT "FK_bd98b4ec8b541de53325d946684"`);
        await queryRunner.query(`ALTER TABLE "portfolios" DROP CONSTRAINT "FK_272be8d6991677ed314c0d32374"`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "transportationcharge" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "refundamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "cancellationfee" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "agentrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "clientrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "totalamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "tax" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "discount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "subtotal" SET DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE "portfolioFiles"`);
        await queryRunner.query(`DROP TYPE "public"."portfolioFiles_type_enum"`);
        await queryRunner.query(`DROP TABLE "portfolios"`);
        await queryRunner.query(`DROP TYPE "public"."portfolios_status_enum"`);
    }

}

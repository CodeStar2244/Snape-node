import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1680352310909 implements MigrationInterface {
    name = 'latestmigration1680352310909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collections" DROP CONSTRAINT "FK_c802e8ed2227a9b30594d3d0813"`);
        await queryRunner.query(`CREATE TYPE "public"."collection_design_gridstyle_enum" AS ENUM('column', 'row')`);
        await queryRunner.query(`CREATE TYPE "public"."collection_design_gridspacing_enum" AS ENUM('column', 'row')`);
        await queryRunner.query(`CREATE TABLE "collection_design" ("id" SERIAL NOT NULL, "typography" character varying, "theme" character varying, "gridStyle" "public"."collection_design_gridstyle_enum" NOT NULL DEFAULT 'column', "gridSpacing" "public"."collection_design_gridspacing_enum" NOT NULL DEFAULT 'column', "focusX" integer, "focusY" integer, CONSTRAINT "PK_0b15a674c89eddaf25cfe95f9a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collection_themes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "background" character varying NOT NULL, "accent" character varying NOT NULL, "button" character varying NOT NULL, CONSTRAINT "PK_a23038b188cf93f32c26fd75972" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."collections_status_enum" RENAME TO "collections_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."collections_status_enum" AS ENUM('PUBLISH', 'HIDDEN')`);
        await queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "status" TYPE "public"."collections_status_enum" USING "status"::"text"::"public"."collections_status_enum"`);
        await queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "status" SET DEFAULT 'HIDDEN'`);
        await queryRunner.query(`DROP TYPE "public"."collections_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "collections" ADD CONSTRAINT "FK_c802e8ed2227a9b30594d3d0813" FOREIGN KEY ("agentId") REFERENCES "tblagent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collections" DROP CONSTRAINT "FK_c802e8ed2227a9b30594d3d0813"`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "transportationcharge" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "refundamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "cancellationfee" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "agentrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "clientrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "totalamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "tax" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "discount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "subtotal" SET DEFAULT '0'`);
        await queryRunner.query(`CREATE TYPE "public"."collections_status_enum_old" AS ENUM('PUBLISH', 'UNPUBLISH')`);
        await queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "status" TYPE "public"."collections_status_enum_old" USING "status"::"text"::"public"."collections_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "status" SET DEFAULT 'UNPUBLISH'`);
        await queryRunner.query(`DROP TYPE "public"."collections_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."collections_status_enum_old" RENAME TO "collections_status_enum"`);
        await queryRunner.query(`DROP TABLE "collection_themes"`);
        await queryRunner.query(`DROP TABLE "collection_design"`);
        await queryRunner.query(`DROP TYPE "public"."collection_design_gridspacing_enum"`);
        await queryRunner.query(`DROP TYPE "public"."collection_design_gridstyle_enum"`);
        await queryRunner.query(`ALTER TABLE "collections" ADD CONSTRAINT "FK_c802e8ed2227a9b30594d3d0813" FOREIGN KEY ("agentId") REFERENCES "tblagent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

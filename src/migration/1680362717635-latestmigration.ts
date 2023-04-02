import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1680362717635 implements MigrationInterface {
    name = 'latestmigration1680362717635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."collection_design_gridspacing_enum" RENAME TO "collection_design_gridspacing_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."collection_design_gridspacing_enum" AS ENUM('regular', 'large')`);
        await queryRunner.query(`ALTER TABLE "collection_design" ALTER COLUMN "gridSpacing" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "collection_design" ALTER COLUMN "gridSpacing" TYPE "public"."collection_design_gridspacing_enum" USING "gridSpacing"::"text"::"public"."collection_design_gridspacing_enum"`);
        await queryRunner.query(`ALTER TABLE "collection_design" ALTER COLUMN "gridSpacing" SET DEFAULT 'regular'`);
        await queryRunner.query(`DROP TYPE "public"."collection_design_gridspacing_enum_old"`);
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
        await queryRunner.query(`CREATE TYPE "public"."collection_design_gridspacing_enum_old" AS ENUM('column', 'row')`);
        await queryRunner.query(`ALTER TABLE "collection_design" ALTER COLUMN "gridSpacing" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "collection_design" ALTER COLUMN "gridSpacing" TYPE "public"."collection_design_gridspacing_enum_old" USING "gridSpacing"::"text"::"public"."collection_design_gridspacing_enum_old"`);
        await queryRunner.query(`ALTER TABLE "collection_design" ALTER COLUMN "gridSpacing" SET DEFAULT 'column'`);
        await queryRunner.query(`DROP TYPE "public"."collection_design_gridspacing_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."collection_design_gridspacing_enum_old" RENAME TO "collection_design_gridspacing_enum"`);
    }

}

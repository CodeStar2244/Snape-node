import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1680544416068 implements MigrationInterface {
    name = 'latestmigration1680544416068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection_design" DROP CONSTRAINT "FK_1cf699d9cac6162ef5783bf3c6a"`);
        await queryRunner.query(`ALTER TABLE "collection_design" RENAME COLUMN "theme" TO "themeId"`);
        await queryRunner.query(`ALTER TABLE "collection_design" DROP COLUMN "themeId"`);
        await queryRunner.query(`ALTER TABLE "collection_design" ADD "themeId" integer`);
        await queryRunner.query(`ALTER TABLE "collection_design" ADD CONSTRAINT "FK_bad7c21b1acf08b663b65c1688b" FOREIGN KEY ("themeId") REFERENCES "collection_themes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collection_design" ADD CONSTRAINT "FK_1cf699d9cac6162ef5783bf3c6a" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection_design" DROP CONSTRAINT "FK_1cf699d9cac6162ef5783bf3c6a"`);
        await queryRunner.query(`ALTER TABLE "collection_design" DROP CONSTRAINT "FK_bad7c21b1acf08b663b65c1688b"`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "transportationcharge" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "refundamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "cancellationfee" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "agentrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "clientrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "totalamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "tax" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "discount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "subtotal" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "collection_design" DROP COLUMN "themeId"`);
        await queryRunner.query(`ALTER TABLE "collection_design" ADD "themeId" character varying`);
        await queryRunner.query(`ALTER TABLE "collection_design" RENAME COLUMN "themeId" TO "theme"`);
        await queryRunner.query(`ALTER TABLE "collection_design" ADD CONSTRAINT "FK_1cf699d9cac6162ef5783bf3c6a" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

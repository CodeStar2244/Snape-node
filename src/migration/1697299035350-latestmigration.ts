import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1697299035350 implements MigrationInterface {
    name = 'latestmigration1697299035350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "studioinvoice" DROP COLUMN "discount"`);
        await queryRunner.query(`ALTER TABLE "studioinvoice" ADD "discount" integer`);
        await queryRunner.query(`ALTER TABLE "studioinvoice" DROP COLUMN "tax"`);
        await queryRunner.query(`ALTER TABLE "studioinvoice" ADD "tax" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "studioinvoice" DROP COLUMN "tax"`);
        await queryRunner.query(`ALTER TABLE "studioinvoice" ADD "tax" jsonb NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "studioinvoice" DROP COLUMN "discount"`);
        await queryRunner.query(`ALTER TABLE "studioinvoice" ADD "discount" jsonb NOT NULL DEFAULT '{}'`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Latestmigration1701008409402 implements MigrationInterface {
    name = 'Latestmigration1701008409402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tblagent" ADD "location" character varying(400)`);
        await queryRunner.query(`ALTER TABLE "tblagent" ADD "businessName" character varying(400)`);
        await queryRunner.query(`ALTER TABLE "tblagent" ADD "timezone" character varying(400)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tblagent" DROP COLUMN "timezone"`);
        await queryRunner.query(`ALTER TABLE "tblagent" DROP COLUMN "businessName"`);
        await queryRunner.query(`ALTER TABLE "tblagent" DROP COLUMN "location"`);
    }

}

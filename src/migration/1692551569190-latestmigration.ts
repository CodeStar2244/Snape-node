import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1692551569190 implements MigrationInterface {
    name = 'latestmigration1692551569190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "studioquestionnaries" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studioquestionnaries" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "studioquestionnaries" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "studioquestionnaries" DROP COLUMN "type"`);
    }

}

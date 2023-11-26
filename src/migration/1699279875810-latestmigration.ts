import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1699279875810 implements MigrationInterface {
    name = 'latestmigration1699279875810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "studioinvoice" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studioinvoice" ALTER COLUMN "currency" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "studioinvoice" ALTER COLUMN "currency" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studioinvoice" ALTER COLUMN "name" SET NOT NULL`);
    }

}

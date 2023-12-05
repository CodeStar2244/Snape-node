import { MigrationInterface, QueryRunner } from "typeorm";

export class Latestmigration1701791596717 implements MigrationInterface {
  name = "Latestmigration1701791596717";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "plans" ADD "headline" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "plans" DROP COLUMN "headline"`);
  }
}

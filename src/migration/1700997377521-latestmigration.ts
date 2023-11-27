import { MigrationInterface, QueryRunner } from "typeorm";

export class Latestmigration1700997377521 implements MigrationInterface {
  name = "Latestmigration1700997377521";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tblagent" ADD "bio" character varying(400)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tblagent" DROP COLUMN "bio"`);
  }
}

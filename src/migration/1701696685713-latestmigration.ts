import { MigrationInterface, QueryRunner } from "typeorm";

export class Latestmigration1701696685713 implements MigrationInterface {
  name = "Latestmigration1701696685713";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "portFolioVideoLinks" DROP CONSTRAINT "UQ_ba48a26d548ce7e49e0fc430be9"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."portFolioVideoLinks_type_enum" RENAME TO "portFolioVideoLinks_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."portFolioVideoLinks_type_enum" AS ENUM('YOUTUBE', 'VIMEO', 'CUSTOM')`,
    );
    await queryRunner.query(
      `ALTER TABLE "portFolioVideoLinks" ALTER COLUMN "type" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "portFolioVideoLinks" ALTER COLUMN "type" TYPE "public"."portFolioVideoLinks_type_enum" USING "type"::"text"::"public"."portFolioVideoLinks_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "portFolioVideoLinks" ALTER COLUMN "type" SET DEFAULT 'YOUTUBE'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."portFolioVideoLinks_type_enum_old"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."portFolioVideoLinks_type_enum_old" AS ENUM('YOUTUBE', 'VIMEO')`,
    );
    await queryRunner.query(
      `ALTER TABLE "portFolioVideoLinks" ALTER COLUMN "type" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "portFolioVideoLinks" ALTER COLUMN "type" TYPE "public"."portFolioVideoLinks_type_enum_old" USING "type"::"text"::"public"."portFolioVideoLinks_type_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "portFolioVideoLinks" ALTER COLUMN "type" SET DEFAULT 'YOUTUBE'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."portFolioVideoLinks_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."portFolioVideoLinks_type_enum_old" RENAME TO "portFolioVideoLinks_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "portFolioVideoLinks" ADD CONSTRAINT "UQ_ba48a26d548ce7e49e0fc430be9" UNIQUE ("url")`,
    );
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1687002509245 implements MigrationInterface {
  name = "latestmigration1687002509245";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "enterprise_collection_tags" ("id" SERIAL NOT NULL, "tag" character varying NOT NULL, CONSTRAINT "UQ_71657be1483a1337e6b9e399708" UNIQUE ("tag"), CONSTRAINT "PK_138cea8e8e66661d2a796fe8fb7" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"enterprisecollections_status_enum\" AS ENUM('PUBLISH', 'HIDDEN')",
    );
    await queryRunner.query(
      'CREATE TABLE "enterprisecollections" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "eventDate" TIMESTAMP NOT NULL, "url" character varying, "slug" character varying, "status" "public"."enterprisecollections_status_enum" NOT NULL DEFAULT \'HIDDEN\', "socialSharing" boolean NOT NULL DEFAULT false, "password" character varying, "download" boolean NOT NULL DEFAULT false, "downloadPin" character varying, "photos" integer DEFAULT \'0\', "videos" integer DEFAULT \'0\', "coverPhoto" character varying DEFAULT \'https://snape-buckets.b-cdn.net/collectionphoto.jpg\', "size" double precision DEFAULT \'0\', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "clientId" integer, CONSTRAINT "UQ_3f7642cbb2c12d42baba6de9570" UNIQUE ("url"), CONSTRAINT "UQ_e299ed162d740a7409766356a5f" UNIQUE ("slug"), CONSTRAINT "PK_a0ddfa3c83106e8c67560c15932" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"enterprise_collection_design_gridstyle_enum\" AS ENUM('column', 'row')",
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"enterprise_collection_design_gridspacing_enum\" AS ENUM('regular', 'large')",
    );
    await queryRunner.query(
      'CREATE TABLE "enterprise_collection_design" ("id" SERIAL NOT NULL, "typography" character varying, "gridStyle" "public"."enterprise_collection_design_gridstyle_enum" NOT NULL DEFAULT \'column\', "gridSpacing" "public"."enterprise_collection_design_gridspacing_enum" NOT NULL DEFAULT \'regular\', "focusX" integer, "focusY" integer, "themeId" integer, "collectionId" integer, CONSTRAINT "REL_036930bcdea0c098ff5eb4cd83" UNIQUE ("collectionId"), CONSTRAINT "PK_f906c518f776d6ebda5aa428e13" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"enterprisefiles_type_enum\" AS ENUM('PHOTO', 'VIDEO')",
    );
    await queryRunner.query(
      'CREATE TABLE "enterprisefiles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "cdnUrl" character varying NOT NULL, "key" character varying NOT NULL, "size" double precision NOT NULL DEFAULT \'0\', "height" integer NOT NULL, "width" integer NOT NULL, "type" "public"."enterprisefiles_type_enum" NOT NULL DEFAULT \'PHOTO\', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "collectionId" integer, CONSTRAINT "PK_ee9eaa752a2dc1f6d0b02a832c0" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "enterprisecollection_tag_join" ("enterpriseCollectionTagsId" integer NOT NULL, "enterprisecollectionsId" integer NOT NULL, CONSTRAINT "PK_a101f80df43c0ecc5bd078de627" PRIMARY KEY ("enterpriseCollectionTagsId", "enterprisecollectionsId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_48e31b1754b6c639568d58f947" ON "enterprisecollection_tag_join" ("enterpriseCollectionTagsId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_d73a1b78f98db149a9106ffb3d" ON "enterprisecollection_tag_join" ("enterprisecollectionsId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "enterprisecollections" ADD CONSTRAINT "FK_781504ed37247ae114cc417a5b4" FOREIGN KEY ("clientId") REFERENCES "enterPriseClient"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "enterprise_collection_design" ADD CONSTRAINT "FK_98117665453847130b27cef5804" FOREIGN KEY ("themeId") REFERENCES "collection_themes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "enterprise_collection_design" ADD CONSTRAINT "FK_036930bcdea0c098ff5eb4cd83b" FOREIGN KEY ("collectionId") REFERENCES "enterprisecollections"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "enterprisefiles" ADD CONSTRAINT "FK_6da693d17dee775aea3121316e1" FOREIGN KEY ("collectionId") REFERENCES "enterprisecollections"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "enterprisecollection_tag_join" ADD CONSTRAINT "FK_48e31b1754b6c639568d58f9474" FOREIGN KEY ("enterpriseCollectionTagsId") REFERENCES "enterprise_collection_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "enterprisecollection_tag_join" ADD CONSTRAINT "FK_d73a1b78f98db149a9106ffb3da" FOREIGN KEY ("enterprisecollectionsId") REFERENCES "enterprisecollections"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "enterprisecollection_tag_join" DROP CONSTRAINT "FK_d73a1b78f98db149a9106ffb3da"',
    );
    await queryRunner.query(
      'ALTER TABLE "enterprisecollection_tag_join" DROP CONSTRAINT "FK_48e31b1754b6c639568d58f9474"',
    );
    await queryRunner.query(
      'ALTER TABLE "enterprisefiles" DROP CONSTRAINT "FK_6da693d17dee775aea3121316e1"',
    );
    await queryRunner.query(
      'ALTER TABLE "enterprise_collection_design" DROP CONSTRAINT "FK_036930bcdea0c098ff5eb4cd83b"',
    );
    await queryRunner.query(
      'ALTER TABLE "enterprise_collection_design" DROP CONSTRAINT "FK_98117665453847130b27cef5804"',
    );
    await queryRunner.query(
      'ALTER TABLE "enterprisecollections" DROP CONSTRAINT "FK_781504ed37247ae114cc417a5b4"',
    );
    await queryRunner.query(
      'DROP INDEX "public"."IDX_d73a1b78f98db149a9106ffb3d"',
    );
    await queryRunner.query(
      'DROP INDEX "public"."IDX_48e31b1754b6c639568d58f947"',
    );
    await queryRunner.query('DROP TABLE "enterprisecollection_tag_join"');
    await queryRunner.query('DROP TABLE "enterprisefiles"');
    await queryRunner.query('DROP TYPE "public"."enterprisefiles_type_enum"');
    await queryRunner.query('DROP TABLE "enterprise_collection_design"');
    await queryRunner.query(
      'DROP TYPE "public"."enterprise_collection_design_gridspacing_enum"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."enterprise_collection_design_gridstyle_enum"',
    );
    await queryRunner.query('DROP TABLE "enterprisecollections"');
    await queryRunner.query(
      'DROP TYPE "public"."enterprisecollections_status_enum"',
    );
    await queryRunner.query('DROP TABLE "enterprise_collection_tags"');
  }
}

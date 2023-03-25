import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1679749236884 implements MigrationInterface {
    name = 'latestmigration1679749236884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tblclient" DROP CONSTRAINT "tblclient_roleid_fkey"`);
        await queryRunner.query(`ALTER TABLE "tbluser" DROP CONSTRAINT "tbluser_roleid_fkey"`);
        await queryRunner.query(`ALTER TABLE "tblagent" DROP CONSTRAINT "tblagent_roleid_fkey"`);
        await queryRunner.query(`CREATE TABLE "assetCategory" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "colour" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_67da675156ea02948cec188ecf8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."assets_status_enum" AS ENUM('Active', 'For Sale', 'Lost', 'For Rent')`);
        await queryRunner.query(`CREATE TABLE "assets" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "imeiNumber" character varying NOT NULL, "price" integer NOT NULL, "status" "public"."assets_status_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "categoryId" integer, CONSTRAINT "PK_da96729a8b113377cfb6a62439c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collection_tags" ("id" SERIAL NOT NULL, "tag" character varying NOT NULL, CONSTRAINT "UQ_40bc0128c0f20bc05a4a6bb9fc0" UNIQUE ("tag"), CONSTRAINT "PK_4270e4bf7d00a8d776a0018b3ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."collections_status_enum" AS ENUM('PUBLISH', 'UNPUBLISH')`);
        await queryRunner.query(`CREATE TABLE "collections" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "eventDate" TIMESTAMP NOT NULL, "url" character varying, "status" "public"."collections_status_enum" NOT NULL DEFAULT 'UNPUBLISH', "socialSharing" boolean NOT NULL DEFAULT false, "password" character varying, "download" boolean NOT NULL DEFAULT false, "downloadPin" character varying, "photos" integer DEFAULT '0', "videos" integer DEFAULT '0', "coverPhoto" character varying DEFAULT 'https://s3.amazonaws.com/dev-media.snape.com/collectionphoto.jpg', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "agentId" integer, CONSTRAINT "UQ_362247ce86cafdeed16c44f9703" UNIQUE ("url"), CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."files_type_enum" AS ENUM('PHOTO', 'VIDEO')`);
        await queryRunner.query(`CREATE TABLE "files" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "key" character varying NOT NULL DEFAULT 'test', "size" integer NOT NULL, "type" "public"."files_type_enum" NOT NULL DEFAULT 'PHOTO', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "collectionId" integer, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collection_tag_join" ("collectionTagsId" integer NOT NULL, "collectionsId" integer NOT NULL, CONSTRAINT "PK_0040275e21869a2e0d24a2f59dc" PRIMARY KEY ("collectionTagsId", "collectionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_73ed095fdbb77d0a8c75874772" ON "collection_tag_join" ("collectionTagsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_aa28a40c0a8547890d6971c554" ON "collection_tag_join" ("collectionsId") `);
        await queryRunner.query(`ALTER TABLE "tblagentmediacategoriesmapping" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tblagentmediacategoriesmapping" ADD CONSTRAINT "PK_66941e140038bd7c9b5f4c95991" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "tblclient" ALTER COLUMN "roleid" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbluser" ALTER COLUMN "roleid" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tblagent" ALTER COLUMN "roleid" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "subtotal" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "discount" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "tax" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "totalamount" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "clientrating" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "agentrating" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "cancellationfee" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "refundamount" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "transportationcharge" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "assets" ADD CONSTRAINT "FK_2e847f9d0120b4ca0d7269dda0e" FOREIGN KEY ("categoryId") REFERENCES "assetCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tblclient" ADD CONSTRAINT "FK_d710e68bf648a26bbed499394d3" FOREIGN KEY ("roleid") REFERENCES "tblrole"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbluser" ADD CONSTRAINT "FK_b9133441a68d9da69bef9f2c751" FOREIGN KEY ("roleid") REFERENCES "tblrole"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tblagent" ADD CONSTRAINT "FK_267afd38e46ffe5d04b56323db6" FOREIGN KEY ("roleid") REFERENCES "tblrole"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collections" ADD CONSTRAINT "FK_c802e8ed2227a9b30594d3d0813" FOREIGN KEY ("agentId") REFERENCES "tblagent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_2b0a7280095e9f022cfaf56036e" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ADD CONSTRAINT "FK_7d608dbbcc4648e07a68e35b38e" FOREIGN KEY ("clientid") REFERENCES "tblclient"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "collection_tag_join" ADD CONSTRAINT "FK_73ed095fdbb77d0a8c758747723" FOREIGN KEY ("collectionTagsId") REFERENCES "collection_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "collection_tag_join" ADD CONSTRAINT "FK_aa28a40c0a8547890d6971c554c" FOREIGN KEY ("collectionsId") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection_tag_join" DROP CONSTRAINT "FK_aa28a40c0a8547890d6971c554c"`);
        await queryRunner.query(`ALTER TABLE "collection_tag_join" DROP CONSTRAINT "FK_73ed095fdbb77d0a8c758747723"`);
        await queryRunner.query(`ALTER TABLE "tblbooking" DROP CONSTRAINT "FK_7d608dbbcc4648e07a68e35b38e"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_2b0a7280095e9f022cfaf56036e"`);
        await queryRunner.query(`ALTER TABLE "collections" DROP CONSTRAINT "FK_c802e8ed2227a9b30594d3d0813"`);
        await queryRunner.query(`ALTER TABLE "tblagent" DROP CONSTRAINT "FK_267afd38e46ffe5d04b56323db6"`);
        await queryRunner.query(`ALTER TABLE "tbluser" DROP CONSTRAINT "FK_b9133441a68d9da69bef9f2c751"`);
        await queryRunner.query(`ALTER TABLE "tblclient" DROP CONSTRAINT "FK_d710e68bf648a26bbed499394d3"`);
        await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_2e847f9d0120b4ca0d7269dda0e"`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "transportationcharge" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "refundamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "cancellationfee" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "agentrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "clientrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "totalamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "tax" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "discount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "subtotal" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblagent" ALTER COLUMN "roleid" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbluser" ALTER COLUMN "roleid" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tblclient" ALTER COLUMN "roleid" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tblagentmediacategoriesmapping" DROP CONSTRAINT "PK_66941e140038bd7c9b5f4c95991"`);
        await queryRunner.query(`ALTER TABLE "tblagentmediacategoriesmapping" DROP COLUMN "id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aa28a40c0a8547890d6971c554"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_73ed095fdbb77d0a8c75874772"`);
        await queryRunner.query(`DROP TABLE "collection_tag_join"`);
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TYPE "public"."files_type_enum"`);
        await queryRunner.query(`DROP TABLE "collections"`);
        await queryRunner.query(`DROP TYPE "public"."collections_status_enum"`);
        await queryRunner.query(`DROP TABLE "collection_tags"`);
        await queryRunner.query(`DROP TABLE "assets"`);
        await queryRunner.query(`DROP TYPE "public"."assets_status_enum"`);
        await queryRunner.query(`DROP TABLE "assetCategory"`);
        await queryRunner.query(`ALTER TABLE "tblagent" ADD CONSTRAINT "tblagent_roleid_fkey" FOREIGN KEY ("roleid") REFERENCES "tblrole"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbluser" ADD CONSTRAINT "tbluser_roleid_fkey" FOREIGN KEY ("roleid") REFERENCES "tblrole"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tblclient" ADD CONSTRAINT "tblclient_roleid_fkey" FOREIGN KEY ("roleid") REFERENCES "tblrole"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

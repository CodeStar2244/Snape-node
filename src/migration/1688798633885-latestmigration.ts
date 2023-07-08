import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1688798633885 implements MigrationInterface {
    name = 'latestmigration1688798633885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enterpriseAgentFavourite" ADD "clientId" integer`);
        await queryRunner.query(`ALTER TABLE "enterpriseAgentFavourite" ADD "agentId" integer`);
        await queryRunner.query(`ALTER TABLE "enterpriseAgentFavourite" ADD CONSTRAINT "FK_cb193d0a7672a2373f337398773" FOREIGN KEY ("clientId") REFERENCES "enterPriseClient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enterpriseAgentFavourite" ADD CONSTRAINT "FK_f20d37d92d9cb13f4da611b78a8" FOREIGN KEY ("agentId") REFERENCES "tblagent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enterpriseAgentFavourite" DROP CONSTRAINT "FK_f20d37d92d9cb13f4da611b78a8"`);
        await queryRunner.query(`ALTER TABLE "enterpriseAgentFavourite" DROP CONSTRAINT "FK_cb193d0a7672a2373f337398773"`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "transportationcharge" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "refundamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "cancellationfee" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "agentrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "clientrating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "totalamount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "tax" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "discount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tblbooking" ALTER COLUMN "subtotal" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "enterpriseAgentFavourite" DROP COLUMN "agentId"`);
        await queryRunner.query(`ALTER TABLE "enterpriseAgentFavourite" DROP COLUMN "clientId"`);
    }

}

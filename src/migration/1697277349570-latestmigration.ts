import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1697277349570 implements MigrationInterface {
    name = 'latestmigration1697277349570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "studioinvoice" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "currency" character varying NOT NULL, "subject" character varying NOT NULL, "status" character varying NOT NULL, "invoiceDetails" jsonb NOT NULL DEFAULT '{}', "subTotalAmount" integer NOT NULL, "totalAmount" integer NOT NULL, "discount" jsonb NOT NULL DEFAULT '{}', "tax" jsonb NOT NULL DEFAULT '{}', "notes" character varying NOT NULL, "paymentDue" TIMESTAMP NOT NULL, "dueOnReceipt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "agentId" integer, CONSTRAINT "PK_37fff88178d199ecd885cb34ee5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "studioinvoice" ADD CONSTRAINT "FK_775e791630d649de9752d808267" FOREIGN KEY ("agentId") REFERENCES "tblagent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "studioinvoice" DROP CONSTRAINT "FK_775e791630d649de9752d808267"`);
        await queryRunner.query(`DROP TABLE "studioinvoice"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class latestmigration1692549703821 implements MigrationInterface {
    name = 'latestmigration1692549703821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "studioquestionnaries" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "subject" character varying NOT NULL, "message" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'AWAITING RESPONSE', "template" jsonb NOT NULL DEFAULT '{}', "response" jsonb NOT NULL DEFAULT '{}', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer, "agentId" integer, CONSTRAINT "PK_4ceee81376e8c249221479186b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "studioquestionnaries" ADD CONSTRAINT "FK_63311739692d93e33db88c1f77e" FOREIGN KEY ("clientId") REFERENCES "studioclient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "studioquestionnaries" ADD CONSTRAINT "FK_33f0edf3c4c9c396f904f9ac2c7" FOREIGN KEY ("agentId") REFERENCES "tblagent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "studioquestionnaries" DROP CONSTRAINT "FK_33f0edf3c4c9c396f904f9ac2c7"`);
        await queryRunner.query(`ALTER TABLE "studioquestionnaries" DROP CONSTRAINT "FK_63311739692d93e33db88c1f77e"`);
        await queryRunner.query(`DROP TABLE "studioquestionnaries"`);
    }

}

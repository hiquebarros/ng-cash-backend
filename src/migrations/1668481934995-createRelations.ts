import { MigrationInterface, QueryRunner } from "typeorm";

export class createRelations1668481934995 implements MigrationInterface {
    name = 'createRelations1668481934995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" numeric(10,2) NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "debitedAccountId" uuid, "creditedAccountId" uuid, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "balance" numeric(10,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "accountId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_68d3c22dbd95449360fdbf7a3f1" UNIQUE ("accountId")`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_cacfcdb0d3076a1ad26ee59bbe6" FOREIGN KEY ("debitedAccountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_f90eea53161e4b78f6df948d759" FOREIGN KEY ("creditedAccountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_68d3c22dbd95449360fdbf7a3f1" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_68d3c22dbd95449360fdbf7a3f1"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_f90eea53161e4b78f6df948d759"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_cacfcdb0d3076a1ad26ee59bbe6"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_68d3c22dbd95449360fdbf7a3f1"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "accountId"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}

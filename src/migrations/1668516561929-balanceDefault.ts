import { MigrationInterface, QueryRunner } from "typeorm";

export class balanceDefault1668516561929 implements MigrationInterface {
    name = 'balanceDefault1668516561929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "balance" SET DEFAULT '100'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "balance" SET DEFAULT '0'`);
    }

}

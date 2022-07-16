import { MigrationInterface, QueryRunner } from "typeorm";

export class stackCreate1657813963864 implements MigrationInterface {
    name = 'stackCreate1657813963864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stack" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_fbaa981bb0579f5c6be52714e2f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "stack"`);
    }

}

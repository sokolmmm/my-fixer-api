import { MigrationInterface, QueryRunner } from "typeorm";

export class passwordReset1660203192052 implements MigrationInterface {
    name = 'passwordReset1660203192052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "password_reset" ("id" SERIAL NOT NULL, "codeHash" character varying NOT NULL, CONSTRAINT "PK_8515e60a2cc41584fa4784f52ce" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "password_reset"`);
    }

}

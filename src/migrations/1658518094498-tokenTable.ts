import { MigrationInterface, QueryRunner } from "typeorm";

export class tokenTable1658518094498 implements MigrationInterface {
    name = 'tokenTable1658518094498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token" ("userId" integer NOT NULL, "refreshToken" character varying NOT NULL, CONSTRAINT "PK_94f168faad896c0786646fa3d4a" PRIMARY KEY ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "token"`);
    }

}

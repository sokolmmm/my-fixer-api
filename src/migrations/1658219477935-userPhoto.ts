import { MigrationInterface, QueryRunner } from "typeorm";

export class userPhoto1658219477935 implements MigrationInterface {
    name = 'userPhoto1658219477935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "photo" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photo"`);
    }

}

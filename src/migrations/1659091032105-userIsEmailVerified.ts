import { MigrationInterface, QueryRunner } from "typeorm";

export class userIsEmailVerified1659091032105 implements MigrationInterface {
    name = 'userIsEmailVerified1659091032105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isEmailVerified" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isEmailVerified"`);
    }

}

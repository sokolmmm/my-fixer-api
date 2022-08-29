import { MigrationInterface, QueryRunner } from "typeorm";

export class usersEnumTitles1657957348102 implements MigrationInterface {
    name = 'usersEnumTitles1657957348102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "title"`);
        await queryRunner.query(`CREATE TYPE "public"."user_title_enum" AS ENUM('mr', 'mrs', 'ms', 'miss')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "title" "public"."user_title_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "title"`);
        await queryRunner.query(`DROP TYPE "public"."user_title_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "title" character varying`);
    }

}

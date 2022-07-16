import { MigrationInterface, QueryRunner } from "typeorm";

export class profileAddRelationWithStack1657814070159 implements MigrationInterface {
    name = 'profileAddRelationWithStack1657814070159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ADD "stackId" integer`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_46aaabe0d79a666df7fd05b268b" FOREIGN KEY ("stackId") REFERENCES "stack"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_46aaabe0d79a666df7fd05b268b"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "stackId"`);
    }

}

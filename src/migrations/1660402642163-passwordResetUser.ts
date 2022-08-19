import { MigrationInterface, QueryRunner } from "typeorm";

export class passwordResetUser1660402642163 implements MigrationInterface {
    name = 'passwordResetUser1660402642163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "password_reset" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "password_reset" ADD CONSTRAINT "UQ_05baebe80e9f8fab8207eda250c" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "password_reset" ADD CONSTRAINT "FK_05baebe80e9f8fab8207eda250c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "password_reset" DROP CONSTRAINT "FK_05baebe80e9f8fab8207eda250c"`);
        await queryRunner.query(`ALTER TABLE "password_reset" DROP CONSTRAINT "UQ_05baebe80e9f8fab8207eda250c"`);
        await queryRunner.query(`ALTER TABLE "password_reset" DROP COLUMN "userId"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class passwordResetUser1660551688494 implements MigrationInterface {
    name = 'passwordResetUser1660551688494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "password_reset" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "password_reset" ADD CONSTRAINT "UQ_1c88db6e50f0704688d1f1978c0" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "password_reset" ADD CONSTRAINT "FK_1c88db6e50f0704688d1f1978c0" FOREIGN KEY ("email") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "password_reset" DROP CONSTRAINT "FK_1c88db6e50f0704688d1f1978c0"`);
        await queryRunner.query(`ALTER TABLE "password_reset" DROP CONSTRAINT "UQ_1c88db6e50f0704688d1f1978c0"`);
        await queryRunner.query(`ALTER TABLE "password_reset" DROP COLUMN "email"`);
    }

}

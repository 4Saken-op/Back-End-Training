import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedPasswordColumn1747887834791 implements MigrationInterface {
    name = 'AddedPasswordColumn1747887834791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
        await queryRunner.query(`UPDATE "employee" SET "password" = 'password' WHERE "password" IS NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "password" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}

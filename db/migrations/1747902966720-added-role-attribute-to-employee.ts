import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedRoleAttributeToEmployee1747902966720 implements MigrationInterface {
    name = 'AddedRoleAttributeToEmployee1747902966720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."employee_role_enum" AS ENUM('UI', 'UX', 'DEVELOPER', 'HR')`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" "public"."employee_role_enum" NOT NULL DEFAULT 'DEVELOPER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."employee_role_enum"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedNewColumnsToEmployeeAndAddress1748176636593 implements MigrationInterface {
    name = 'AddedNewColumnsToEmployeeAndAddress1748176636593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_9e91434feeca66ec06ff68809c9"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "house_no" character varying `);
        await queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying `);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employee_id" character varying `);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_f9d306b968b54923539b3936b03" UNIQUE ("employee_id")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "date_of_joining" TIMESTAMP `);
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer `);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying `);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_9e91434feeca66ec06ff68809c9" FOREIGN KEY ("dept_id") REFERENCES "dept"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_9e91434feeca66ec06ff68809c9"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "date_of_joining"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_f9d306b968b54923539b3936b03"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "house_no"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_9e91434feeca66ec06ff68809c9" FOREIGN KEY ("dept_id") REFERENCES "dept"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}

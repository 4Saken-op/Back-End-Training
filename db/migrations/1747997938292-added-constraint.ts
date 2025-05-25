import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedConstraint1747997938292 implements MigrationInterface {
    name = 'AddedConstraint1747997938292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_9e91434feeca66ec06ff68809c9"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_9e91434feeca66ec06ff68809c9" FOREIGN KEY ("dept_id") REFERENCES "dept"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_9e91434feeca66ec06ff68809c9"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_9e91434feeca66ec06ff68809c9" FOREIGN KEY ("dept_id") REFERENCES "dept"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

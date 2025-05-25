import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedDeptEntity1747979172806 implements MigrationInterface {
    name = 'AddedDeptEntity1747979172806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dept" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_5eb4a4c9f25934f105299edffd7" UNIQUE ("name"), CONSTRAINT "PK_deff0441db275143073fd33362a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "dept_id" integer`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_9e91434feeca66ec06ff68809c9" FOREIGN KEY ("dept_id") REFERENCES "dept"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_9e91434feeca66ec06ff68809c9"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "dept_id"`);
        await queryRunner.query(`DROP TABLE "dept"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedAddressDto1748861918167 implements MigrationInterface {
  name = "UpdatedAddressDto1748861918167";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "house_no" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "line2" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ALTER COLUMN "employee_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ALTER COLUMN "date_of_joining" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ALTER COLUMN "experience" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ALTER COLUMN "status" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee" ALTER COLUMN "status" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ALTER COLUMN "experience" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ALTER COLUMN "date_of_joining" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ALTER COLUMN "employee_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "line2" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "house_no" DROP NOT NULL`
    );
  }
}

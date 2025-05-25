import { Column, Entity, OneToOne } from "typeorm";
import AbstractEntity from "./_abstract.entity";
import Employee from "./employee.entity";

@Entity()
class Address extends AbstractEntity {

    @Column()
    line1: string;

    @Column()
    pincode: string;

    @OneToOne(() => Employee, (employee) => employee.address)
    employee: Employee;

  }
  
  export default Address;
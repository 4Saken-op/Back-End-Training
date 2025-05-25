import { Column, Entity, OneToMany } from "typeorm";
import AbstractEntity from "./_abstract.entity";
import Employee from "./employee.entity";

@Entity()
class Dept extends AbstractEntity{

    @Column({unique: true})
    name: string;

    @OneToMany(() => Employee , (employee) => employee.dept, {
        cascade: true,
        onDelete: "CASCADE"
    })
    employee: Employee;

  }
  
  export default Dept;

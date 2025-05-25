import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import AbstractEntity from "./_abstract.entity";
import Address from "./address.entity";
import Dept from "./dept.entity";

export enum EmployeeRole {
    UI = 'UI',
    UX = 'UX',
    DEVELOPER = 'DEVELOPER',
    HR = 'HR'
}

@Entity()
class Employee extends AbstractEntity{

    @Column({unique: true})
    email: string;

    @Column()
    name: string;

    @Column()
    age: Number;

    @OneToOne(() => Address , {
        cascade:true,
        onDelete:'CASCADE'
    })
    @JoinColumn()
    address: Address;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: EmployeeRole,
        default: EmployeeRole.DEVELOPER
    })
    role: EmployeeRole

    @ManyToOne(() => Dept, (dept) => dept.employee) 
    @JoinColumn()
    dept: Dept
  }
  
  export default Employee;
  
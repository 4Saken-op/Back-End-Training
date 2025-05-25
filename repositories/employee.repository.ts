import { Repository } from "typeorm";
import Employee from "../entities/employee.entity";

class EmployeeRepository {
    constructor( private repository: Repository<Employee>) {}

    async create(employee: Employee): Promise<Employee> {
        return this.repository.save(employee);
    }

    async findMany(): Promise<Employee[]> {
        return this.repository.find({
            relations: {
                address: true,
                dept: true
            }
        });
    }

    async findOneById(id: number): Promise<Employee> {
        return this.repository.findOneBy({id});
    }

    async findOneByEmail(email: string): Promise<Employee> {
        return this.repository.findOneBy({email});
    }

    async update(id: number, employee: Employee): Promise<void> {
        await this.repository.save({id, ...employee});
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete( {id} );
    }

    async remove(employee: Employee): Promise<void> {
        await this.repository.remove(employee);
    }

    async getEmployeeByDeptID(id: number) {
        return this.repository.find({
            where: {
                dept: {id}   // dept id is being saved as an object in table
            },
        })
    }
}

export default EmployeeRepository;


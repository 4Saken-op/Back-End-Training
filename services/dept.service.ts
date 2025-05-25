import Dept from "../entities/dept.entity";
import Employee from "../entities/employee.entity";
import HttpException from "../exceptions/httpException";
import { DeptRepository } from "../repositories/dept.repository";
import { deptService } from "../routes/dept.route";
import { employeeService } from "../routes/employee.route";
import { LoggerService } from "./logger.service";

export class DeptService {
    private logger = LoggerService.getInstance(DeptService.name);
    constructor (private deptRepository: DeptRepository) {}

    async createDept(name:string): Promise<Dept> {
        const newDept = new Dept();
        newDept.name = name;
        return this.deptRepository.create(newDept);
    }

    async getAllDept(): Promise<Dept[]> {
        return this.deptRepository.getAllDept();
    }

    async getDeptById(id: number): Promise<Dept> {
        let dept = this.deptRepository.findOneById(id);
        if (!dept) throw new Error("Dept Not Found");

        return dept;
    }

    async getEmployeesOfDept(id: number): Promise<Employee[]> {
        return await employeeService.getEmployeeByDeptID(id);
    }

    async removeDept(id: number) {
        const existingDept = await this.deptRepository.findOneById(id) 
        if (existingDept){
            this.deptRepository.delete(existingDept);
        }
        else {
            throw new HttpException(404, "Department not present");
        }
    }

    async updateDept(id: number, name:string) {
        const existingdept = this.deptRepository.findOneById(id);

        if (existingdept) {
            const d = new Dept();
            d.name = name;

            await this.deptRepository.update(id, d);
        } else {
            throw new HttpException(404, "Employee Not Found");
        }
    }
}
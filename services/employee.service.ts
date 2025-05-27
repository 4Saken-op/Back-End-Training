import EmployeeRepository from "../repositories/employee.repository";
import Employee, { EmployeeRole, Status } from "../entities/employee.entity";
import Address from "../entities/address.entity";
import bcrypt from "bcrypt";
import HttpException from "../exceptions/httpException";
import { LoggerService } from "./logger.service";
import Dept from "../entities/dept.entity";
import { deptService } from "../routes/dept.route";

class EmployeeService {
    private logger = LoggerService.getInstance(EmployeeService.name);
    constructor (private employeeRepository: EmployeeRepository) {}

    async createEmployee(email:string, name:string, age:number, address: Address, password: string, role: EmployeeRole, dept: number,
        employeeID: string, dateOfJoining: number, experience: number, status: Status): Promise<Employee> {
        
        let deptObj = await deptService.getDeptById(dept);
        if (!deptObj) throw new HttpException(404, "Department not present");

        let date = new Date(dateOfJoining);
        
        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        newEmployee.age = age;
        newEmployee.address = address;
        newEmployee.password = await bcrypt.hash(password, 10);
        newEmployee.role = role;
        newEmployee.dept = deptObj;
        newEmployee.employeeID = employeeID,
        newEmployee.dateOfJoining = date,
        newEmployee.experience = experience,
        newEmployee.status = status

        return this.employeeRepository.create(newEmployee);
    }

    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findMany();
    }

    async getEmployeeById(id: number): Promise<Employee> {
        let employee = this.employeeRepository.findOneById(id);

        if (!employee) throw new Error("Employee Not Found");

        return employee;
    }

    async getEmployeeByEmail(email: string): Promise<Employee> {
        return this.employeeRepository.findOneByEmail(email);
    }

    async updateEmployee(id: number, email: string, name:string, age:number, password: string, address: Address, deptID: number, role: EmployeeRole,
        employeeID: string, dateOfJoining: Date, experience: number, status: Status) {

        const existingEmployee = this.employeeRepository.findOneById(id);
        const existingDepartment = await deptService.getDeptById(deptID);

        if (!existingDepartment) {
            throw new HttpException(404, "Department doesnt exsit");
        }

        if (existingEmployee) {
            const employee = new Employee();
            employee.name = name;
            employee.email = email;
            employee.password = await bcrypt.hash(password, 10);
            employee.age = age;
            employee.address = address;
            employee.dept = existingDepartment,
            employee.role = role,
            employee.dateOfJoining = dateOfJoining,
            employee.employeeID = employeeID,
            employee.experience = experience,
            employee.status = status
            await this.employeeRepository.update(id, employee);
        } else {
            throw new HttpException(404, "Employee Not Found");
        }
    }

    async patchEmployee(id: number, email: string, name:string, age:number, password: string, address: Address, deptID: number, role: EmployeeRole,
        employeeID: string, dateOfJoining: Date, experience: number, status: Status) {
        const existingEmployee = await this.employeeRepository.findOneById(id);

        const existingDepartment = await deptService.getDeptById(deptID);

        if (!existingDepartment) {
            throw new HttpException(404, "Department doesnt exsit");
        }

        if (existingEmployee) {
            const employee = new Employee();
            if (name) existingEmployee.name = name;
            if (email) existingEmployee.email = email;
            if (password) existingEmployee.password = await bcrypt.hash(password, 10);
            if (age) existingEmployee.age = age;
            if (address) existingEmployee.address = address;
            if (role) existingEmployee.role = role;
            if (existingDepartment) existingEmployee.dept = existingDepartment;
            if (employeeID) existingEmployee.employeeID = employeeID;
            if (dateOfJoining) existingEmployee.dateOfJoining = dateOfJoining;
            if (experience) existingEmployee.experience = experience;
            if (status) existingEmployee.status = status;

            await this.employeeRepository.update(id, existingEmployee);
        } else {
            throw new HttpException(404, "Employee Not Found");
        }
    }

    async deleteEmployee(id: number) {
        const existingEmployee = await this.employeeRepository.findOneById(id) 
        if (existingEmployee){
            this.employeeRepository.delete(id);
        }
    }

    async removeEmployee(id: number) {
        const existingEmployee = await this.employeeRepository.findOneById(id) 
        if (existingEmployee){
            this.employeeRepository.remove(existingEmployee);
        }
    }

    async getEmployeeByDeptID(id: number) {
        return this.employeeRepository.getEmployeeByDeptID(id);
    }
}

export default EmployeeService;
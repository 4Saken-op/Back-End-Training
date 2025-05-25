import {Request, Response, Router, NextFunction} from "express";
import EmployeeRepository from "../repositories/employee.repository";
import EmployeeService from "../services/employee.service";
import HttpException from "../exceptions/httpException";
import { isEmail } from "../validators/emailValidator";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { validate } from "class-validator";
import Address from "../entities/address.entity";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import Dept from "../entities/dept.entity";


class EmployeeController {
    constructor(private employeeService: EmployeeService, router: Router) {
        router.post("/", this.createEmployee.bind(this));
        router.get("/", this.getAllEmployees.bind(this)); //rolemiddleware
        router.get("/:id", this.getEmployeeById.bind(this));
        router.put("/:id", this.updateEmployee);
        router.patch("/:id", this.patchEmployee);
        router.delete("/:id", this.deleteEmployee);
    }

    async createEmployee(req: Request, res: Response, next: NextFunction) {
        // try {
        // // const name = req.body.name;
        // // const email = req.body.email;
        // // const age = req.body.age;
        // // const address = req.body.address;
        // const { email, name, age, address } = req.body;
        // if (!isEmail(email)) {
        //     throw new HttpException(412, "not valid email")
        // }

        // const savedEmployee = await this.employeeService.createEmployee(email, name, age, address);
        // res.status(201).send(savedEmployee);
        // } catch (err) {
        //     console.log(err);
        //     next(err);
        // }

        try {
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(createEmployeeDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }
            let newAddress = new Address();
            newAddress.line1 = createEmployeeDto.address.line1;
            newAddress.pincode = createEmployeeDto.address.pincode;
            const savedEmployee = await this.employeeService.createEmployee(
                createEmployeeDto.email,
                createEmployeeDto.name,
                createEmployeeDto.age,
                newAddress,
                createEmployeeDto.password,
                createEmployeeDto.role,
                createEmployeeDto.deptID
            );
            res.status(201).send(savedEmployee);
        } catch (error) {
            next(error);
        }

    }

    async getAllEmployees(req: Request, res: Response)  {
        res.status(200).send(await this.employeeService.getAllEmployees());
    }

    async getEmployeeById(req: Request, res: Response, next: NextFunction) {

        try {
            const employee = await this.employeeService.getEmployeeById(Number(req.params.id));
            if (!employee) {
                throw new HttpException(404,"Employee id dont exist");
            }
            res.status(200).send(employee);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    updateEmployee = async (req: Request, res: Response) => {
        res.status(200).send(
            await this.employeeService.updateEmployee(
                Number(req.params.id),
                req.body.email,
                req.body.name,
                req.body.age,
                req.body.password,
                req.body.address
            )
        );
    }

    patchEmployee = async (req: Request, res: Response) => {
        let name = null, email = null, age = null, password = null;
        let address = new Address();
        if (req.body.name != undefined) name = req.body.name;
        if (req.body.age != undefined) age = req.body.age;
        if (req.body.email != undefined) email = req.body.email;
        if (req.body.password != undefined) password = req.body.password;
        if (req.body.address != undefined) {
            address = req.body.address;
        } else {
            address = null;
        }
        
        res.status(200).send(
            await this.employeeService.patchEmployee(
                Number(req.params.id),
                email, name, age, password, address
            )
        );
    }

    deleteEmployee = async (req: Request, res: Response) => {
        res.status(200).send(await this.employeeService.removeEmployee(Number(req.params.id)));
    }
}

export default EmployeeController;
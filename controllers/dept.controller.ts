import { Request, Response, NextFunction, Router } from "express";
import { DeptService } from "../services/dept.service";
import { plainToInstance } from "class-transformer";
import { CreateDeptDto } from "../dto/create-dept-dto";
import { validate } from "class-validator";
import HttpException from "../exceptions/httpException";

export class DeptController {
    constructor (private deptService: DeptService, router: Router) {
        router.post("/", this.createDept.bind(this));
        router.get("/", this.getAllDept.bind(this));
        router.get("/:id", this.getDeptById.bind(this));
        router.put("/:id", this.updateDept);
        // router.patch("/:id", this.patchEmployee);
        router.delete("/:id", this.deleteDept);
    }

    updateDept = async (req: Request, res: Response) => {
        res.status(200).send(
            await this.deptService.updateDept(
                Number(req.params.id),
                req.body.name
            )
        );
    }

    async createDept(req:Request, res:Response, next:NextFunction) {

        try {
            const createDeptDto = plainToInstance(CreateDeptDto, req.body);
            const errors = await validate(createDeptDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }
            const savedDept = await this.deptService.createDept(
                createDeptDto.name
            );
            res.status(201).send(savedDept);
        } catch (error) {
            next(error);
        }
    }

    async getAllDept(req: Request, res: Response) {
        res.status(200).send(await this.deptService.getAllDept());
    }

    async getDeptById(req: Request, res: Response, next: NextFunction) {

        try {
            const dept = await this.deptService.getDeptById(Number(req.params.id));
            if (!dept) {
                throw new HttpException(404,"Dept id dont exist");
            }
            const deptEmployees = await this.deptService.getEmployeesOfDept(Number(req.params.id));
            res.status(200).send(deptEmployees);


        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    deleteDept = async (req:Request, res:Response, next:NextFunction) => {
        res.status(200).send(await this.deptService.removeDept(Number(req.params.id)));
    }
}
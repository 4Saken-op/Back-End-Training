import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/httpException";
import { EmployeeRole } from "../entities/employee.entity";

export const roleMiddleware = (req: Request, res:Response, next:NextFunction) => {
    const role = req.user?.role;
    if (role != EmployeeRole.HR)  {
        throw new HttpException(403, "User has no access due to role");
    }
    next();
}
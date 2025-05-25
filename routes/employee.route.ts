import express from "express";
import datasource from "../db/data-source";
import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import EmployeeService from "../services/employee.service";
import EmployeeController from "../controllers/employee.controller";

const employeeRouter = express.Router();

const employeeRepository = new EmployeeRepository(datasource.getRepository(Employee));
export const employeeService = new EmployeeService(employeeRepository);
export const employeeController = new EmployeeController(employeeService, employeeRouter);

export default employeeRouter;
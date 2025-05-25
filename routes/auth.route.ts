import express from "express";
import { AuthController } from "../controllers/auth.controller"; 
import { AuthService } from "../services/auth.service";
import EmployeeService from "../services/employee.service";
import { employeeService } from "./employee.route"

const authRouter = express.Router();
const authService = new AuthService( employeeService );
const authController = new AuthController( authService, authRouter );
export default authRouter;
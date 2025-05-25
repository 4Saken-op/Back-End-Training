import express from "express";
import { DeptRepository } from "../repositories/dept.repository";
import datasource from "../db/data-source";
import Dept from "../entities/dept.entity";
import { DeptService } from "../services/dept.service";
import { DeptController } from "../controllers/dept.controller";

const deptRouter = express.Router();

const deptRepo = new DeptRepository(datasource.getRepository(Dept));
export const deptService = new DeptService(deptRepo);
export const deptController = new DeptController(deptService, deptRouter)

export default deptRouter;
import express from "express";
import Employee from "../entities/employee.entity";
import datasource from "../db/data-source";
import { Entity } from "typeorm";


const employeeRouter = express.Router();

employeeRouter.get("/", async (req, res) => {
  const employeeRepository = datasource.getRepository(Employee);
  const employees = await employeeRepository.find();
  res.status(200).send(employees);
});

employeeRouter.get("/:id", async (req, res) => {
  const empId = Number(req.params["id"]);
  const employeeRepository = datasource.getRepository(Employee);
  // const employees = await employeeRepository.find();
  // const employee = employees.find((emp) => emp.id === empId);

  const employee = await employeeRepository.findOneBy({id: empId});
  if (!employee) {
    res.status(404).send("Employee not found");
    return;
  }
  res.status(200).send(employee);
});

employeeRouter.post("/", async (req, res) => {
  console.log(req.body);
  const newEmployee = new Employee();
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;

  const employeeRepository = datasource.getRepository(Employee);
  await employeeRepository.insert(newEmployee)
  res.status(200).send(newEmployee);
});

employeeRouter.delete("/:id", async (req, res) => {

  const employeeRepository = datasource.getRepository(Employee);
  await employeeRepository.delete(Number(req.params["id"]));
  res.status(200).send();
});

employeeRouter.put("/:id", async (req, res) => {
  const employeeRepository = datasource.getRepository(Employee);
  const empId = Number(req.params["id"]);

  await employeeRepository.update(empId, req.body)
  console.log("update employees");
  res.status(200).send(await employeeRepository.findOneBy({id: empId}));
});

employeeRouter.patch("/:id", async (req, res) => {
  const employeeRepository = datasource.getRepository(Employee);
  const empId = Number(req.params["id"]);

  const employee = await employeeRepository.findOneBy({id: empId});
  employee.email = req.body.email;
  await employeeRepository.save(employee);
  console.log("update employees by patch");
  res.status(200).send(await employeeRepository.findOneBy({id: empId}));
});

export default employeeRouter;

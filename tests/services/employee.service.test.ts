import { mock, MockProxy } from "jest-mock-extended";
import { when } from "jest-when";
import EmployeeRepository from "../../repositories/employee.repository";
import EmployeeService from "../../services/employee.service";
import Employee from "../../entities/employee.entity";

describe("EmployeeService", () => {
  let employeeRepository: MockProxy<EmployeeRepository>;
  let employeeService: EmployeeService;

  beforeEach(() => {
    employeeRepository = mock<EmployeeRepository>();
    employeeService = new EmployeeService(employeeRepository);
  });

  // running tests for each function
  describe("getEmployeeById", () => {
    it("should return employee when proper id exists", async () => {
      //Arrange
      const mockEmployee = { id: 1, name: "e1" } as Employee;
      when(employeeRepository.findOneById)
        .calledWith(1)
        .mockReturnValue(mockEmployee);

      //Act
      const result = await employeeService.getEmployeeById(1);

      //Assert
      expect(employeeRepository.findOneById).toHaveBeenCalledWith(1);
      expect(result).toStrictEqual(mockEmployee);
    });

    it("should throw error when id doesnt exist", async () => {
      // Arrange
      when(employeeRepository.findOneById)
        .calledWith(1)
        .mockReturnValue(undefined);

      // Act & Assert
      await expect(employeeService.getEmployeeById(1)).rejects.toThrow(
        "Employee Not Found"
      );

      expect(employeeRepository.findOneById).toHaveBeenCalledWith(1);
    });
  });
});

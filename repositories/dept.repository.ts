import {Repository} from "typeorm";
import Dept from "../entities/dept.entity";

export class DeptRepository {
    constructor (private repository: Repository<Dept>) {}

    async create(dept: Dept): Promise<Dept> {
        return this.repository.save(dept);
    }

    async getAllDept(): Promise<Dept[]> {
        return this.repository.find();
    }

    async findOneById(id: number): Promise<Dept> {
        return this.repository.findOneBy({id});
    }

    async delete(d: Dept) {
        return this.repository.softRemove(d);
    }

    async update(id: number, dept: Dept): Promise<void> {
        await this.repository.save({id, ...dept});
    }

}
import { RegulationClass } from '../models/regulationClass';
import { DatabaseProvider } from '../database/index';
import { DeleteResult } from 'typeorm';

export class RegulationClassService {
    public async create(regulationClass: RegulationClass): Promise<RegulationClass> {
        const connection = await DatabaseProvider.getConnection();

        const newRegulationClass = new RegulationClass();
        newRegulationClass.id = regulationClass.id;
        newRegulationClass.type = regulationClass.type;

        return await connection.getRepository(RegulationClass).save(newRegulationClass);
    }

    public async getAll(): Promise<Array<RegulationClass>> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(RegulationClass).find();
    }

    public async delete(id: number): Promise<DeleteResult> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(RegulationClass).delete(id);
    }
}

export const regulationClassService = new RegulationClassService();
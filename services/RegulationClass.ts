import { RegulationClass } from '../models/regulationClass';
import { DatabaseProvider } from '../database/index';

export class RegulationClassService {
    // public async create(enactment: Enactment): Promise<Enactment> {
    //     const connection = await DatabaseProvider.getConnection();

    //     const newEnactment = new Enactment();
    //     newEnactment.enactmentId = regulation.enactmentId;
    //     newRegulation.info = regulation.info;
    //     newRegulation.regulationClassId = regulation.regulationClassId;

    //     return await connection.getRepository(Regulation).save(newEnactment);
    // }

    public async getAll(): Promise<Array<RegulationClass>> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(RegulationClass).find();
    }
    // public async delete(id: number): Promise<void> {
    //     const connection = await DatabaseProvider.getConnection();
    //     return await connection.getRepository(Regulation).removeById(id);
    // }
}

export const regulationClassService = new RegulationClassService();
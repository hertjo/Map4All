import { Regulation } from '../models/regulation';
import { DatabaseProvider } from '../database/index';

export class RegulationService {
    // public async create(enactment: Enactment): Promise<Enactment> {
    //     const connection = await DatabaseProvider.getConnection();

    //     const newEnactment = new Enactment();
    //     newEnactment.enactmentId = regulation.enactmentId;
    //     newRegulation.info = regulation.info;
    //     newRegulation.regulationClassId = regulation.regulationClassId;

    //     return await connection.getRepository(Regulation).save(newEnactment);
    // }

    public async getAllbyEnactmentId(enactmentId: number): Promise<Array<Regulation>> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Regulation).find({ where: { enactmentId: enactmentId } });
    }

    // public async delete(id: number): Promise<void> {
    //     const connection = await DatabaseProvider.getConnection();
    //     return await connection.getRepository(Regulation).removeById(id);
    // }
}

export const regulationService = new RegulationService();
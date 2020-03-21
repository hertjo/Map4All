import { Regulation } from '../models/regulation';
import { DatabaseProvider } from '../database/index';

export class RegulationService {
    public async create(regulation: Regulation): Promise<Regulation> {
        const connection = await DatabaseProvider.getConnection();

        const newRegulation = new Regulation();
        //newEnactment.enactmentId = regulation.enactmentId;
        //newRegulation.info = regulation.info;
        //newRegulation.regulationClassId = regulation.regulationClassId;

        return await connection.getRepository(Regulation).save(newRegulation);
    }

    public async getAll(): Promise<Array<Regulation>> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(Regulation).find();
    }

    public async getById(id: number): Promise<Regulation> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(Regulation).findOne(id);
    }

    // TODO check also date in regulation
    public async getAllbyEnactmentId(enactmentId: number): Promise<Array<Regulation>> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Regulation).find({ where: { "erlassId": enactmentId } });
    }

    // public async delete(id: number): Promise<void> {
    //     const connection = await DatabaseProvider.getConnection();
    //     return await connection.getRepository(Regulation).removeById(id);
    // }
}

export const regulationService = new RegulationService();
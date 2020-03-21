import { Regulation } from '../models/regulation';
import { DatabaseProvider } from '../database/index';

export class RegulationService {
    public async list(customerId: number): Promise<Regulation[]> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(Regulation).find({
            where: {
                customer: customerId
            }
        });
    }

    public async create(regulation: Regulation): Promise<Regulation> {
        const connection = await DatabaseProvider.getConnection();

        const newRegulation = new Regulation();
        // TODO Creation of Object

        return await connection.getRepository(Regulation).save(newRegulation);
    }

    public async getById(id: number): Promise<Regulation> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(Regulation).findOneById(id);
    }

    public async delete(id: number): Promise<void> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Regulation).removeById(id);
    }
}

export const regulationService = new RegulationService();
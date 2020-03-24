import { District } from '../models/district';
import { DatabaseProvider } from '../database/index';

export class DistrictService {
    public async getAll(): Promise<Array<District>> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(District).find();
    }

    public async getById(id: number): Promise<District> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(District).findOne(id);
    }
}

export const districtService = new DistrictService();
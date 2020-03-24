import { State } from '../models/state';
import { DatabaseProvider } from '../database/index';

export class StateService {
    public async getAll(): Promise<Array<State>> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(State).find();
    }

    public async getById(id: number): Promise<State> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(State).findOne(id);
    }
}

export const stateService = new StateService();
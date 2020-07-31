import { Regulation } from '../models/regulation';
import { DatabaseProvider } from '../database/index';
import { DeleteResult, Between } from 'typeorm';
import { addYears } from 'date-fns';
import { groupBy, toPairs } from 'lodash';

export class RegulationService {
    private afterDate = (date: Date) => Between(date, addYears(date, 100));

    public async create(regulation: Regulation): Promise<Regulation> {
        const connection = await DatabaseProvider.getConnection();

        const newRegulation = new Regulation();
        newRegulation.id = regulation.id;
        newRegulation.info = regulation.info;
        newRegulation.regulationClassId = regulation.regulationClassId;
        newRegulation.enactmentId = regulation.enactmentId;
        newRegulation.specDate = regulation.specDate;

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

    public async getAllbyEnactmentId(enactmentId: number): Promise<Array<Regulation>> {
        const connection = await DatabaseProvider.getConnection();
        const regulationList = await connection.getRepository(Regulation).find({
            where: {
                "enactmentId": enactmentId//,
                //"specDate": this.afterDate(new Date()) || null
            }
        });
        // TODO Sorting
        return groupBy(regulationList, "regulationClass.type");
    }

    public async delete(id: number): Promise<DeleteResult> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Regulation).delete(id);
    }
}

export const regulationService = new RegulationService();
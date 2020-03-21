import { DatabaseProvider } from '../database/index';
import { Enactment } from '../models/enactment';
import { Between } from 'typeorm';
import { addYears, subYears } from 'date-fns';

export class EnactmentService {
    private afterDate = (date: Date) => Between(date, addYears(date, 100));
    private beforeDate = (date: Date) => Between(subYears(date, 100), date);

    // public async create(enactment: Enactment): Promise<Enactment> {
    //     const connection = await DatabaseProvider.getConnection();

    //     const newEnactment = new Enactment();
    //     //newEnactment.enactmentId = regulation.enactmentId;
    //     //newRegulation.info = regulation.info;
    //     //newRegulation.regulationClassId = regulation.regulationClassId;

    //     return await connection.getRepository(Regulation).save(newEnactment);
    // }

    public async getAll(): Promise<Array<Enactment>> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(Enactment).find();
    }

    public async getById(id: number): Promise<Enactment> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(Enactment).findOne(id);
    }

    public async getByStateId(id: number): Promise<Enactment> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(Enactment).findOne({
            where: {
                "startDatum": this.afterDate(new Date()),
                "endDatum": this.beforeDate(new Date()) || null,
                "bundeslandID": id
            }
        });
    }

    // public async delete(id: number): Promise<void> {
    //     const connection = await DatabaseProvider.getConnection();
    //     return await connection.getRepository(Regulation).removeById(id);
    // }
}

export const enactmentService = new EnactmentService();
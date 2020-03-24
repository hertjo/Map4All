import { DatabaseProvider } from '../database/index';
import { Enactment } from '../models/enactment';
import { Between, IsNull, DeleteResult } from 'typeorm';
import { addYears, subYears } from 'date-fns';

export class EnactmentService {
    private afterDate = (date: Date) => Between(date, addYears(date, 100));
    private beforeDate = (date: Date) => Between(subYears(date, 100), date);

    public async create(enactment: Enactment): Promise<Enactment> {
        const connection = await DatabaseProvider.getConnection();

        const newEnactment = new Enactment();
        newEnactment.id = enactment.id;
        newEnactment.date = enactment.date;
        newEnactment.startDate = enactment.startDate;
        newEnactment.endDate = enactment.endDate;
        newEnactment.url = enactment.url;
        newEnactment.stateId = enactment.stateId;
        newEnactment.districtId = enactment.districtId;

        return await connection.getRepository(Enactment).save(newEnactment);
    }

    public async getAllByState(): Promise<Array<Enactment>> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(Enactment).find({
            where:
            {
                "districtId": 0
            }
        });
    }

    public async getAllByDistrict(): Promise<Array<Enactment>> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(Enactment).find({
            where:
            {
                "districtId": !0
            }
        });
    }

    public async getById(id: number): Promise<Enactment> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(Enactment).findOne(id);
    }

    public async getByStateId(id: number): Promise<Enactment> {
        const connection = await DatabaseProvider.getConnection();
        console.log(this.afterDate(new Date()));
        console.log(this.beforeDate(new Date()));
        return connection.getRepository(Enactment).findOne({
            where: {
                "startDate": this.beforeDate(new Date()),
                "endDate": this.afterDate(new Date()) || null,
                "stateId": id
            }
        });
    }

    public async getByDistrictId(id: number): Promise<Enactment> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(Enactment).findOne({
            where: {
                "startDate": this.beforeDate(new Date()),
                "endDate": this.afterDate(new Date()) || null,
                "districtId": id
            }
        });
    }

    public async delete(id: number): Promise<DeleteResult> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Enactment).delete(id);
    }
}

export const enactmentService = new EnactmentService();
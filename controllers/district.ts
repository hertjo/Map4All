import { Controller } from './controller';
import { HttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { districtService } from '../services/district';

export class DistrictController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('district', this.getAll.bind(this));
        httpServer.get('district/:id', this.getById.bind(this));
    }

    private async getAll(req: Request, res: Response): Promise<void> {
        const district = await districtService.getAll();
        res.send(district ? 200 : 404, district);
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const district = await districtService.getById(req.params.id);
        res.send(district ? 200 : 404, district);
    }
}

export const stateController = new DistrictController();
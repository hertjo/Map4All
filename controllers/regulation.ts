import { Controller } from './controller';
import { HttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { regulationService } from '../services/regulation';

export class RegulationController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('regulation', this.getAll.bind(this));
        httpServer.get('regulation/:id', this.getById.bind(this));
        httpServer.post('regulation', this.create.bind(this));
        httpServer.del('regulation/:id', this.remove.bind(this));
    }

    private async getAll(req: Request, res: Response): Promise<void> {
        const regulation = await regulationService.getAll();
        res.send(regulation ? 200 : 404, regulation);
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const regulation = await regulationService.getById(req.params.id);
        res.send(regulation ? 200 : 404, regulation);
    }

    private async create(req: Request, res: Response): Promise<void> {
        try {
            res.send(await regulationService.create(req.body));
        }
        catch (e) {
            res.send(404);
        }
    }

    private async remove(req: Request, res: Response): Promise<void> {
        try {
            await regulationService.delete(req.params);
            res.send(200);
        }
        catch (e) {
            res.send(500);
        }
    }
}

export const regulationController = new RegulationController();
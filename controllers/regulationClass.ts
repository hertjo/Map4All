import { Controller } from './controller';
import { HttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { regulationClassService } from '../services/regulationClass';

export class RegulationClassController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('regulation-class', this.getAll.bind(this));
        httpServer.post('regulation-class', this.create.bind(this));
        httpServer.del('regulation-class/:id', this.remove.bind(this));
    }

    private async getAll(req: Request, res: Response): Promise<void> {
        const regulationClass = await regulationClassService.getAll();
        res.send(regulationClass ? 200 : 404, regulationClass);
    }

    private async create(req: Request, res: Response): Promise<void> {
        try {
            res.send(await regulationClassService.create(req.body));
        }
        catch (e) {
            res.send(404);
        }
    }

    private async remove(req: Request, res: Response): Promise<void> {
        try {
            await regulationClassService.delete(req.params.id);
            res.send(200);
        }
        catch (e) {
            res.send(500);
        }
    }
}

export const regulationClassController = new RegulationClassController();
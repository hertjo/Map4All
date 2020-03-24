import { Controller } from './controller';
import { HttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { stateService } from '../services/state';

export class StateController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('state', this.getAll.bind(this));
        httpServer.get('state/:id', this.getById.bind(this));
    }

    private async getAll(req: Request, res: Response): Promise<void> {
        const state = await stateService.getAll();
        res.send(state ? 200 : 404, state);
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const state = await stateService.getById(req.params.id);
        res.send(state ? 200 : 404, state);
    }
}

export const stateController = new StateController();
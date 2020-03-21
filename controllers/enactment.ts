import { Controller } from './controller';
import { HttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { regulationService } from '../services/regulation';
import { enactmentService } from '../services/Enactment';

export class EnactmentController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('enactment/state', this.getAllByState.bind(this));
        httpServer.get('enactment/state/:stateId', this.getByStateId.bind(this));
        httpServer.get('enactment/state-regulations/:stateId', this.getAllbyStateEnactmentId.bind(this));
        // TODO endpoints for districts
        httpServer.post('enactment', this.create.bind(this));
        //httpServer.del('enactment', this.remove.bind(this));
    }

    private async getAllByState(req: Request, res: Response): Promise<void> {
        const enactment = await enactmentService.getAllByState();
        res.send(enactment ? 200 : 404, enactment);
    }

    private async getByStateId(req: Request, res: Response): Promise<void> {
        const enactment = await enactmentService.getByStateId(req.params.stateId);
        res.send(enactment ? 200 : 404, enactment);
    }

    private async getAllbyStateEnactmentId(req: Request, res: Response): Promise<void> {
        const enactment = await enactmentService.getByStateId(req.params.stateId);
        const regulationList = await regulationService.getAllbyEnactmentId(enactment.id);
        res.send(regulationList ? 200 : 404, regulationList);
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await enactmentService.create(req.body));
    }

    // private async remove(req: Request, res: Response): Promise<void> {
    //     try {
    //         await enactmentService.delete(req.params.id);
    //         res.send(200);
    //     }
    //     catch (e) {
    //         res.send(500);
    //     }
    // }
}

export const enactmentController = new EnactmentController();
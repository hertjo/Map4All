import { Controller } from './controller';
import { HttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { regulationService } from '../services/regulation';
import { enactmentService } from '../services/Enactment';
import { Regulation } from '../models/regulation';

export class EnactmentController implements Controller {
    public initialize(httpServer: HttpServer): void {
        // TODO
        httpServer.get('state/:stateId', this.getAllbyStateEnactmentId.bind(this));
        // httpServer.get('district/:enactmentId', this.getAllbyStateEnactmentId.bind(this));
        // httpServer.post('regulation/:id/', this.create.bind(this));
        // httpServer.del('regulation/:id/', this.remove.bind(this));
    }

    private async getAllbyStateEnactmentId(req: Request, res: Response): Promise<void> {
        const enactment = await enactmentService.getByStateId(req.params.stateId);
        const regulationList = await regulationService.getAllbyEnactmentId(enactment.id);
        res.send(regulationList ? 200 : 404, regulationList);
    }

    // private async create(req: Request, res: Response): Promise<void> {
    //     res.send(await regulationService.create(req.body));
    // }

    // private async remove(req: Request, res: Response): Promise<void> {
    //     try {
    //         await regulationService.delete(req.params.bid);
    //         res.send(200);
    //     }
    //     catch (e) {
    //         res.send(500);
    //     }
    // }
}

export const enactmentController = new EnactmentController();
import { Controller } from './controller';
import { HttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { regulationService } from '../services/regulation';

export class RegulationController implements Controller {
    public initialize(httpServer: HttpServer): void {
        //httpServer.get('state/:stateId/', this.getAllbyEnactmentId.bind(this));
        // httpServer.post('regulation/:id/', this.create.bind(this));
        // httpServer.del('regulation/:id/', this.remove.bind(this));
    }

    // private async getAllbyEnactmentId(req: Request, res: Response): Promise<void> {
    //     const regulation = await regulationService.getAllbyEnactmentId(req.params.stateId);
    //     res.send(regulation ? 200 : 404, regulation);
    // }

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

export const regulationController = new RegulationController();
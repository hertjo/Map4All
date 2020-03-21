import { Controller } from './controller';
import { HttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { regulationClassService } from '../services/regulationClass';

export class RegulationClassController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('regulation-class', this.getAll.bind(this));
        // httpServer.post('regulation/:id/', this.create.bind(this));
        // httpServer.del('regulation/:id/', this.remove.bind(this));
    }

    private async getAll(req: Request, res: Response): Promise<void> {
        const regulationClass = await regulationClassService.getAll();
        res.send(regulationClass ? 200 : 404, regulationClass);
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

export const regulationClassController = new RegulationClassController();
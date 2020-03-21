import { Controller } from './controller';
import { HttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { regulationService } from '../services/regulation';

export class BillController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('regulation/:id/', this.getById.bind(this));
        httpServer.post('customer/:id/', this.create.bind(this));
        httpServer.del('customer/:id/', this.remove.bind(this));
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const bill = await regulationService.getById(req.params.id);
        res.send(bill ? 200 : 404, bill);
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await regulationService.create(req.body));
    }

    private async remove(req: Request, res: Response): Promise<void> {
        try {
            await regulationService.delete(req.params.bid);
            res.send(200);
        }
        catch (e) {
            res.send(500);
        }
    }
}
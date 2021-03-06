import { HttpServer } from './httpServer';
import { RequestHandler, Server } from 'restify';
import * as restify from 'restify';
import { CONTROLLERS } from '../controllers/index';
import * as corsMiddleware from 'restify-cors-middleware';
import * as err from 'restify-errors';
import restifyOAuth2 from 'restify-oauth2';

export class ApiServer implements HttpServer {
    private restify: Server;

    public get(url: string, requestHandler: RequestHandler): void {
        this.addRoute('get', url, requestHandler);
    }

    public post(url: string, requestHandler: RequestHandler): void {
        this.addRoute('post', url, requestHandler);
    }

    public del(url: string, requestHandler: RequestHandler): void {
        this.addRoute('del', url, requestHandler);
    }

    public put(url: string, requestHandler: RequestHandler): void {
        this.addRoute('put', url, requestHandler);
    }

    private addRoute(method: 'get' | 'post' | 'put' | 'del', url: string, requestHandler: RequestHandler): void {
        this.restify[method](url, async (req, res, next) => {
            try {
                await requestHandler(req, res, next);
            }
            catch (e) {
                console.log(e);
                res.send(500, e);
            }
        });
        console.log(`Added route ${method.toUpperCase()} ${url}`);
    }

    public start(port: number): void {
        this.restify = restify.createServer();

        const cors = corsMiddleware({
            preflightMaxAge: 5, //Optional
            origins: ['*'],
            allowHeaders: ['*'],
            exposeHeaders: ['*']
        })
        this.restify.pre(cors.preflight);
        this.restify.use(cors.actual);
        this.restify.use(restify.plugins.queryParser());
        this.restify.use(restify.plugins.bodyParser());
        this.restify.use(restify.plugins.authorizationParser());

        this.restify.use((req, res, next) => {
            const users = {
                admin: {
                    id: 1,
                    password: process.env.API_TOKEN
                }
            };

            if (req.username !== 'admin' || req.authorization.basic.password !== users[req.username].password) {
                next(new err.UnauthorizedError());
            } else {
                next();
            }
        });

        this.addControllers();

        this.restify.listen(port, () => console.log(`Server is up & running on port ${port}`));
    }

    private addControllers(): void {
        CONTROLLERS.forEach(controller => controller.initialize(this));
    }
}
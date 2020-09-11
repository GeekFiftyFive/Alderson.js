import express from "express";
import bodyParser from "body-parser";
import { Config } from "./interfaces/Config";
import { Endpoint } from "./interfaces/Endpoint";
import { Action } from "./interfaces/Action";
import { Handler } from "./types/Handler";
import { handlerBuilders } from "./handlers/HandlerBuilders";

export function buildHandlers(actions: Action[], origins: any = {}): Handler[] {
    return actions.map((action: Action) => {
        return handlerBuilders.get(action.type)(action, origins);
    });
}

export function buildApp(config: Config): express.Express {
    const app: express.Express = express();

    app.use(bodyParser.text());

    if(config.endpoints) {
        config.endpoints.forEach((endpoint: Endpoint) => {
            const handlers = buildHandlers(endpoint.actions, config.origins);
            app[endpoint.method](endpoint.uri, (req: any, res: any) => handlers[0](req, res, handlers.slice(1)));
        });
    } else {
        const handlers = buildHandlers(config.actions, config.origins);
        app.all("/*", (req: any, res: any) => handlers[0](req, res, handlers.slice(1)));
    }

    return app;
}

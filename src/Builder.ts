import express from "express";
import bodyParser from "body-parser";
import { Config } from "./interfaces/Config";
import { Endpoint } from "./interfaces/Endpoint";
import { Action } from "./interfaces/Action";
import { ActionType } from "./enums/ActionType";

function buildHandler(actions: Action[]) {
    const handlers: any[] = [];

    actions.forEach((action: Action) => {
        switch(action.type) {
            case ActionType.DELAY:
                handlers.push((req: any, res: any, next: (...args: any[]) => void) => {
                    setTimeout(() => next(req, res), action.parameters?.duration);
                });
                break;
            case ActionType.ECHO:
                handlers.push((req: any, res: any, _next: (...args: any[]) => void) => {
                    if (req.get('Content-Type')) {
                        res = res.type(req.get('Content-Type'));
                    }

                    res.send(req.body);
                    // terminal
                });
                break;
            default:
                console.error(`Invalid action type: ${action.type}`);
        }
    });

    return (req: any, res: any) => {
        for(let i = 0; i < handlers.length - 1; i++) {
            handlers[i](req, res, handlers[i + 1]);
        }
    };
}

export function buildApp(config: Config): express.Express {
    const app: express.Express = express();

    app.use(bodyParser.text());

    config.endpoints.forEach((endpoint: Endpoint) => {
        app[endpoint.method](endpoint.uri, buildHandler(endpoint.actions));
    });

    return app;
}

import express from "express";
import bodyParser from "body-parser";
import { Config } from "./interfaces/Config";
import { Endpoint } from "./interfaces/Endpoint";
import { Action } from "./interfaces/Action";
import { ActionType } from "./enums/ActionType";
import { Handler } from "./types/Handler";
import * as ActionValidation from "./validation/ActionValidator";

function buildHandler(actions: Action[]) {
    const handlers: any[] = [];

    actions.forEach((action: Action) => {

        switch(action.type) {
            case ActionType.DELAY:
                handlers.push((req: any, res: any, rest: Handler[]) => {
                    setTimeout(() => rest[0](req, res, rest.slice(1)), action.parameters?.duration);
                });
                break;
            case ActionType.ECHO:
                handlers.push((req: any, res: any, rest: Handler[]) => {
                    ActionValidation.validate(action, rest);
                    if (req.get('Content-Type')) {
                        res = res.type(req.get('Content-Type'));
                    }

                    res.send(req.body);
                    // terminal
                });
                break;
            case ActionType.LOG:
                handlers.push((req: any, res: any, rest: Handler[]) => {
                    if(!action?.parameters.message) {
                        console.error("Log actions require parameters!");
                    } else {
                        console.info(action.parameters.message);
                    }

                    rest[0](req, res, rest.slice(1));
                });
                break;
            default:
                console.error(`Invalid action type: ${action.type}`);
        }
    });

    return (req: any, res: any) => handlers[0](req, res, handlers.slice(1));
}

export function buildApp(config: Config): express.Express {
    const app: express.Express = express();

    app.use(bodyParser.text());

    config.endpoints.forEach((endpoint: Endpoint) => {
        app[endpoint.method](endpoint.uri, buildHandler(endpoint.actions));
    });

    return app;
}

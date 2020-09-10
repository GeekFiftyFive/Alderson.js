import { HandlerBuilder } from "../types/HandlerBuilder";
import { Action } from "../interfaces/Action";
import { Handler } from "../types/Handler";

export const StatusCodeHandlerBuilder: HandlerBuilder = (action: Action, _origins: any) => {
    return (req: any, res: any, rest: Handler[]) => {
        const statusCode = action?.parameters?.status_code ? action?.parameters.status_code : 200;

        res.statusCode = statusCode;

        rest[0](req, res, rest.slice(1));
    };
}
import { HandlerBuilder } from "../types/HandlerBuilder";
import { Action } from "../interfaces/Action";
import { Handler } from "../types/Handler";

export const DelayHandlerBuilder: HandlerBuilder = (action: Action, _origins: any) => {
    return (req: any, res: any, rest: Handler[]) => {
        setTimeout(() => rest[0](req, res, rest.slice(1)), action.parameters?.duration);
    };
}
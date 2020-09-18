import { HandlerBuilder } from "../types/HandlerBuilder";
import { Action } from "../interfaces/Action";
import { Handler } from "../types/Handler";
import { Config } from "../interfaces/Config";

export const DelayHandlerBuilder: HandlerBuilder = (action: Action, _config: Config) => {
    return (req: any, res: any, rest: Handler[]) => {
        setTimeout(() => rest[0](req, res, rest.slice(1)), action.parameters?.duration);
    };
}
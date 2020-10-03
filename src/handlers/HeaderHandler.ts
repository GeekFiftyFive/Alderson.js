import { HandlerBuilder } from "../types/HandlerBuilder";
import { Action } from "../interfaces/Action";
import { Handler } from "../types/Handler";
import { Config } from "../interfaces/Config";

export const HeaderHandlerBuilder: HandlerBuilder = (action: Action, _config: Config) => {
    return (req: any, res: any, rest: Handler[]) => {
        res.append(action.parameters.header, action.parameters.value);

        rest[0](req, res, rest.slice(1));
    };
}
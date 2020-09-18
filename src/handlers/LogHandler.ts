import { HandlerBuilder } from "../types/HandlerBuilder";
import { Action } from "../interfaces/Action";
import { Handler } from "../types/Handler";
import { Config } from "../interfaces/Config";

export const LogHandlerBuilder: HandlerBuilder = (action: Action, _config: Config) => {
    return (req: any, res: any, rest: Handler[]) => {
        if(!action?.parameters.message) {
            console.error("Log actions require parameters!");
        } else {
            console.info(action.parameters.message);
        }

        rest[0](req, res, rest.slice(1));
    };
}
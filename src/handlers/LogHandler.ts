import { HandlerBuilder } from "../types/HandlerBuilder";
import { Action } from "../interfaces/Action";
import { Handler } from "../types/Handler";
import { Config } from "../interfaces/Config";

export const LogHandlerBuilder: HandlerBuilder = (action: Action, config: Config) => {
    return (req: any, res: any, rest: Handler[]) => {
        if(!action?.parameters.message) {
            console.error(`\x1b[36m${config.filename}:\x1b[0m Log actions require parameters!`);
        } else {
            console.info(`\x1b[36m${config.filename}:\x1b[0m ${action.parameters.message}`);
        }

        rest[0](req, res, rest.slice(1));
    };
}
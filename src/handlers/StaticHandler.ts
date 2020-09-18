import * as ActionValidation from "../validation/ActionValidator";
import { HandlerBuilder } from "../types/HandlerBuilder";
import { Action } from "../interfaces/Action";
import { Handler } from "../types/Handler";
import { Config } from "../interfaces/Config";

export const StaticHandlerBuilder: HandlerBuilder = (action: Action, _config: Config) => {
    return (_req: any, res: any, rest: Handler[]) => {
        ActionValidation.validate(action, rest);

        const contentType = action?.parameters.content_type ?
                                action?.parameters.content_type : "application/json";

        res.type(contentType);
        res.send(action?.parameters.body);
    };
}
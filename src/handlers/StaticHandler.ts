import * as ActionValidation from "../validation/ActionValidator";
import { HandlerBuilder } from "../types/HandlerBuilder";
import { Action } from "../interfaces/Action";
import { Handler } from "../types/Handler";

export const StaticHandlerBuilder: HandlerBuilder = (action: Action, _origins: any) => {
    return (_req: any, res: any, rest: Handler[]) => {
        ActionValidation.validate(action, rest);

        const contentType = action?.parameters.content_type ?
                                action?.parameters.content_type : "application/json";

        res.type(contentType);
        res.send(action?.parameters.body);
    };
}
import * as ActionValidation from "../validation/ActionValidator";
import { HandlerBuilder } from "../types/HandlerBuilder";
import { Action } from "../interfaces/Action";
import { Handler } from "../types/Handler";

export const EchoHandlerBuilder: HandlerBuilder = (action: Action, _origins: any) => {
    return (req: any, res: any, rest: Handler[]) => {
        ActionValidation.validate(action, rest);
        if (req.get('Content-Type')) {
            res = res.type(req.get('Content-Type'));
        }

        res.send(req.body);
        // terminal
    };
}
import axios from "axios";
import * as ActionValidation from "../validation/ActionValidator";
import { HandlerBuilder } from "../types/HandlerBuilder";
import { Action } from "../interfaces/Action";
import { Handler } from "../types/Handler";
import { Method as AxiosMethod } from "axios";

export const OriginHandlerBuilder: HandlerBuilder = (action: Action, origins: any) => {
    return (req: any, res: any, rest: Handler[]) => {
        ActionValidation.validate(action, rest);
        const uri: string = action.parameters?.uri ? action.parameters?.uri : req.url;

        axios({
            method: req.method as AxiosMethod,
            url: origins[action.parameters.origin] + uri,
            data: req.body,
            headers: req.headers
        }).then((response: any) => {
            res.send(response.data);
        }).catch((ex: Error) => {
            console.error(ex);
        });
    };
}
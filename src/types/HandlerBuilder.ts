import { Action } from "../interfaces/Action";
import { Handler } from "./Handler";

export type HandlerBuilder = (action: Action, origin: any) => Handler;
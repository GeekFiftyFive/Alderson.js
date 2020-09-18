import { Config } from "../interfaces/Config";
import { Action } from "../interfaces/Action";
import { Handler } from "./Handler";

export type HandlerBuilder = (action: Action, config: Config) => Handler;
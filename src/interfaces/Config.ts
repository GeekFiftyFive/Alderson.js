import { Endpoint } from "./Endpoint";
import { Action } from "./Action";

export interface Config {
    port?: number,
    origins?: any,
    endpoints?: Endpoint[],
    actions?: Action[]
}
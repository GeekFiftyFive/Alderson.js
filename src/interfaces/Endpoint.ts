import { Action } from "./Action";
import { Method } from "../enums/Method";

export interface Endpoint {
    uri: string,
    method: Method,
    actions: Action[]
}
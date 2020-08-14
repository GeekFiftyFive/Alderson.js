import { Endpoint } from "./Endpoint";

export interface Config {
    port: number,
    origins: object,
    endpoints: Endpoint[]
}
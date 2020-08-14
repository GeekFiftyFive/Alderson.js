import { Endpoint } from "./Endpoint";

export interface Config {
    port: number,
    origins: any,
    endpoints: Endpoint[]
}
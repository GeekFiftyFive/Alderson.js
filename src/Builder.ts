import express from "express";
import { Config } from "./interfaces/Config";

export function buildApp(config: Config): express.Express {
    let app: express.Express = express();

    return app;
}
#!/usr/bin/env node

import { exit } from "process";
import fs from "fs";
import * as Builder from "./Builder";
import { Config } from "./interfaces/Config";
import * as ConfigValidator from "./validation/ConfigValidator";

if(process.argv.length < 3) {
    console.log("Usage: aldersonjs [config jsons]");
    exit(1);
}

for(let i = 2; i < process.argv.length; i++) {
    const config: Config = { ...JSON.parse(fs.readFileSync(process.argv[i]).toString()), filename: process.argv[i] };

    const errors: Error[] = ConfigValidator.validate(config);

    if(errors.length > 0) {
        console.error(errors);
        exit(2);
    }

    const app = Builder.buildApp(config);
    const port = config.port ? config.port : 8080; // default port to listen

    // start the Express server
    app.listen(port, () => {
        console.log( `server started at http://localhost:${port}` );
    } );
}
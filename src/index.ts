import { exit } from "process";
import fs from "fs";
import * as Builder from "./Builder";
import { Config } from "./interfaces/Config";

if(process.argv.length < 3) {
    console.log("Usage: npx alderson {config json}");
    exit(1);
}

const config: Config = JSON.parse(fs.readFileSync(process.argv[2]).toString());

const app = Builder.buildApp(config);
const port = 8080; // default port to listen

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
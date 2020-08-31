import { Config } from "../interfaces/Config";
import { Endpoint } from "../interfaces/Endpoint";
import { Action } from "../interfaces/Action";

function validateKeysDefined(object: any, keys: string[] | string[][]): Error[] {
    const actualKeys: string[] = Object.keys(object);

    const errors: Error[] = [];

    keys?.forEach((key: string | string[]) => {
        let defined = false;

        if(Array.isArray(key)) {
            // Must define one of the keys
            key.forEach(subKey => {
                defined = defined || actualKeys.includes(subKey);
            });
        } else { // Must define the key
            defined = actualKeys.includes(key);
        }

        if(!defined) {
            errors.push(new Error(
                `Field ${key} must be configured on object ${JSON.stringify(object)}`
            ));
        }
    });

    return errors;
}

function validateEndpoints(endpoints: Endpoint[], errors: Error[]) {
    if(!Array.isArray(endpoints)) {
        errors.push(new Error("Endpoints must be an array"));
        return errors;
    }

    endpoints.forEach(endpoint => {
        errors = errors.concat(validateKeysDefined(endpoint, [
            "uri", "method", "actions"
        ]));
    });
}

function validateActions(actions: Action[], errors: Error[]) {
    if(!Array.isArray(actions)) {
        errors.push(new Error("Actions must be an array"));
        return errors;
    }
}

export function validate(config: Config) {
    let errors: Error[];
    errors = validateKeysDefined(config, [["endpoints", "actions"]]);

    if(errors.length > 0) return errors;

    if(config.endpoints && config.actions) {
        errors.push(new Error(
            `Cannot define both actions and endpoints on object ${JSON.stringify(config)}`
        ))
    } else if (config.endpoints) {
        validateEndpoints(config.endpoints, errors)
    } else {
        validateActions(config.actions, errors);
    }

    return errors;
}

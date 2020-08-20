import { Config } from "../interfaces/Config";

function validateKeysDefined(object: any, keys: string[]): Error[] {
    const actualKeys: string[] = Object.keys(object);

    const errors: Error[] = [];

    keys.forEach(key => {
        if(!actualKeys.includes(key)) {
            errors.push(new Error(
                `Field ${key} must be configured on object ${JSON.stringify(object)}`
            ));
        }
    });

    return errors;
}

export function validate(config: Config) {
    let errors: Error[];
    errors = validateKeysDefined(config, ["endpoints"]);

    if(errors.length > 0) return errors;

    if(!Array.isArray(config.endpoints)) {
        errors.push(new Error("Endpoints must be an array"));
        return errors;
    }

    config.endpoints.forEach(endpoint => {
        errors = errors.concat(validateKeysDefined(endpoint, [
            "uri", "method", "actions"
        ]));
    });

    return errors;
}

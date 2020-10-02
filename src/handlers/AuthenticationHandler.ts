import { HandlerBuilder } from "../types/HandlerBuilder";
import { Action } from "../interfaces/Action";
import { Handler } from "../types/Handler";
import jwt from "jsonwebtoken";
import { jwk2pem } from "pem-jwk";
import axios, { Method as AxiosMethod } from "axios";
import { Config } from "../interfaces/Config";

async function getToken(action: Action, origins: any) {
    const openidConfig = await axios({
        method: "get" as AxiosMethod,
        url: origins[action.parameters.origin] + "/.well-known/openid-configuration"
    });

    const jwks = await axios({
        method: "get" as AxiosMethod,
        url: openidConfig.data.jwks_uri
    });

    return jwks.data;
}

export const AuthenticationHandlerBuilder: HandlerBuilder = (action: Action, config: Config) => {
    return (req: any, res: any, rest: Handler[]) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401);

        getToken(action, config.origins).then(jwks => {
            jwt.verify(token, jwk2pem(jwks.keys[0]), (err: any) => {
                if(err) {
                    return res.sendStatus(403);
                }
                rest[0](req, res, rest.slice(1));
            })
        })
    };
}
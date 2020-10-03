import { ActionType } from "../enums/ActionType";
import { HandlerBuilder } from "../types/HandlerBuilder";
import { DelayHandlerBuilder } from "./DelayHandler";
import { EchoHandlerBuilder } from "./EchoHandler";
import { LogHandlerBuilder } from "./LogHandler";
import { OriginHandlerBuilder } from "./OriginHandler";
import { StatusCodeHandlerBuilder } from "./StatusCodeHandler";
import { StaticHandlerBuilder } from "./StaticHandler";
import { AuthenticationHandlerBuilder } from "./AuthenticationHandler";
import { HeaderHandlerBuilder } from "./HeaderHandler";

export const handlerBuilders: Map<ActionType, HandlerBuilder> = new Map([
    [ActionType.DELAY, DelayHandlerBuilder],
    [ActionType.ECHO, EchoHandlerBuilder],
    [ActionType.LOG, LogHandlerBuilder],
    [ActionType.ORIGIN, OriginHandlerBuilder],
    [ActionType.STATUS_CODE, StatusCodeHandlerBuilder],
    [ActionType.STATIC, StaticHandlerBuilder],
    [ActionType.AUTHENTICATION, AuthenticationHandlerBuilder],
    [ActionType.HEADER, HeaderHandlerBuilder]
]);
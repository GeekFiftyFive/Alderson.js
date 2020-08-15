import { Action } from "../interfaces/Action";
import { ActionType } from "../enums/ActionType";
import { Handler } from "../types/Handler";

export function validate(action: Action, rest: Handler[]) {
    switch(action.type) {
        case ActionType.ECHO:
        case ActionType.ORIGIN:
        case ActionType.STATIC:
            if(rest.length > 0) console.warn("Any actions after a terminal action will be ignored!");
    }
}
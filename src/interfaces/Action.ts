import { ActionType } from "../enums/ActionType";

export interface Action {
    type: ActionType,
    parameters?: any
}
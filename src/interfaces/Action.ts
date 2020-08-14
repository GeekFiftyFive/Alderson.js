const { Interface } = require("readline");

export interface Action {
    type: string,
    parameters?: any
}
import axios from "axios";
import { buildHandlers } from "../src/Builder";
import { Handler } from "../src/types/Handler";
import { ActionType } from "../src/enums/ActionType";
import { Action } from "../src/interfaces/Action";
import { Config } from "../src/interfaces/Config";

jest.mock("axios");

const dummyConfig: Config = {
    filename: ""
}

describe("Builder", () => {
    it("should create no handlers for an empty array", () => {
        const handlers: Handler[] = buildHandlers([], dummyConfig);
        expect(handlers).toHaveLength(0);
    });

    const verifyRequestResponse = (actions: Action[], expected: any) => {
        const handlers: Handler[] = buildHandlers(actions, dummyConfig);
        expect(handlers).toHaveLength(1);

        const req = {
            get: jest.fn(header => {
                if(header === "Content-Type") {
                    return "application/json";
                }
                return null;
            }),
            body: "Mock body"
        };

        const send = jest.fn(() => {});
        const type = jest.fn(() => { return { send } });

        handlers[0](req, { type, send }, []);

        expect(type).toHaveBeenCalledWith(expected.type);
        expect(send).toHaveBeenCalledWith(expected.body);
    }

    it("should properly create an echo handler", () => {
        const actions: Action[] = [{
            type: ActionType.ECHO
        }];
        const type = "application/json";
        const body = "Mock body";

        verifyRequestResponse(actions, { type, body });
    });

    it("should properly create a static handler when content type specified", () => {
        const actions: Action[] = [{
            type: ActionType.STATIC,
            parameters: {
                content_type: "text/html",
                body: "<h1>Test body</h1>"
            }
        }];
        const type = actions[0].parameters.content_type;
        const body = actions[0].parameters.body;

        verifyRequestResponse(actions, { type, body });
    });

    it("should properly create a static handler when content type not specified", () => {
        const actions: Action[] = [{
            type: ActionType.STATIC,
            parameters: {
                body: "{}"
            }
        }];
        const type = "application/json";
        const body = actions[0].parameters.body;

        verifyRequestResponse(actions, { type, body });
    });

    const verifyStatusCode = (actions: Action[], statusCode: Number) => {
        const handlers = buildHandlers(actions, dummyConfig);
        const callback = jest.fn(() => {});
        let req = {};
        let res = {
            statusCode: null as Number
        };

        handlers[0](req, res, [callback]);

        expect(res.statusCode).toEqual(statusCode);
        expect(callback).toHaveBeenCalledTimes(1);
    };

    it("should properly create a status code handler when a status code is specified", () => {
        const actions: Action[] = [{
            type: ActionType.STATUS_CODE,
            parameters: {
                status_code: 403
            }
        }];
        verifyStatusCode(actions, 403);
    });

    it("should properly create a status code handler when a status code is not specified", () => {
        const actions: Action[] = [{
            type: ActionType.STATUS_CODE
        }];
        verifyStatusCode(actions, 200);
    });

    it("should properly create a delay handler", () => {
        jest.useFakeTimers();
        (setTimeout as any).mockClear();
        const actions: Action[] = [{
            type: ActionType.DELAY,
            parameters: {
                duration: 3000
            }
        }];
        const handlers = buildHandlers(actions, dummyConfig);
        handlers[0]({}, {}, [() => {}]);

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000);
    });

    it("should properly create an origin handler when uri is specified", () => {
        const actions: Action[] = [{
            type: ActionType.ORIGIN,
            parameters: {
                origin: "test origin",
                uri: "/api"
            }
        }];
        const req = {
            method: "GET",
            body: "Request body",
            headers: {
                header_1: "sample value"
            }
        };
        const res = {
            send: jest.fn(() => {})
        };
        const handlers = buildHandlers(actions, {
            ...dummyConfig,
            origins: {
                "test origin": "localhost:8080"
            }
        });
        (axios as any).mockResolvedValue({
            data: "Request body"
        });
        (axios as any).mockClear();
        handlers[0](req, res, []);

        expect(axios).toHaveBeenCalledWith({
            method: "GET",
            url: "localhost:8080/api",
            data: "Request body",
            headers: req.headers
        });
    });

    it("should properly create an origin handler when uri is not specified", () => {
        const actions: Action[] = [{
            type: ActionType.ORIGIN,
            parameters: {
                origin: "test origin"
            }
        }];
        const req = {
            method: "GET",
            body: "Request body",
            url: "/v1",
            headers: {
                header_1: "sample value"
            }
        };
        const res = {
            send: jest.fn(() => {})
        };
        const handlers = buildHandlers(actions, {
            ...dummyConfig,
            origins: {
                "test origin": "localhost:8080"
            }
        });
        (axios as any).mockResolvedValue({
            data: "Request body"
        });
        (axios as any).mockClear();
        handlers[0](req, res, []);

        expect(axios).toHaveBeenCalledWith({
            method: "GET",
            url: "localhost:8080/v1",
            data: "Request body",
            headers: req.headers
        });
    });

    // TODO: Add test coverage for authentication action
});
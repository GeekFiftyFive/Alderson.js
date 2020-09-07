import { buildHandlers } from "../src/Builder";
import { Handler } from "../src/types/Handler";
import { ActionType } from "../src/enums/ActionType";
import { Action } from "../src/interfaces/Action";

describe("Builder", () => {
    it("should create no handlers for an empty array", () => {
        const handlers: Handler[] = buildHandlers([]);
        expect(handlers).toHaveLength(0);
    });

    const verifyRequestResponse = (actions: Action[], expected: any) => {
        const handlers: Handler[] = buildHandlers(actions);
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

        expect(type.mock.calls[0]).toEqual([expected.type]);
        expect(send.mock.calls[0]).toEqual([expected.body]);
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
        const handlers = buildHandlers(actions);
        const callback = jest.fn(() => {});
        let req = {};
        let res = {
            statusCode: null as Number
        };

        handlers[0](req, res, [callback]);

        expect(res.statusCode).toEqual(statusCode);
        expect(callback.mock.calls).toHaveLength(1);
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
        const actions: Action[] = [{
            type: ActionType.DELAY,
            parameters: {
                duration: 3000
            }
        }];
        const handlers = buildHandlers(actions);
        const req = {};
        const res = {};
        handlers[0](req, res, [() => {}]);

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
    });
});
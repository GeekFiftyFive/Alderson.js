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
});
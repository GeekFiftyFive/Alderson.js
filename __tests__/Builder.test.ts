import { buildHandlers } from "../src/Builder";
import { Handler } from "../src/types/Handler";
import { ActionType } from "../src/enums/ActionType";

describe("Builder", () => {
    it("should create no handlers for an empty array", () => {
        const handlers: Handler[] = buildHandlers([]);
        expect(handlers).toHaveLength(0);
    });

    it("should properly create an echo handler", () => {
        const handlers: Handler[] = buildHandlers([{
            type: ActionType.ECHO
        }]);
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

        handlers[0](req, { type }, []);

        expect(type.mock.calls[0]).toEqual(["application/json"]);
        expect(send.mock.calls[0]).toEqual(["Mock body"]);
    });

    it("should properly create a static handler when content type specified", () => {
        const handlers: Handler[] = buildHandlers([{
            type: ActionType.STATIC,
            parameters: {
                content_type: "text/html",
                body: "<h1>Test body</h1>"
            }
        }]);
        expect(handlers).toHaveLength(1);

        const send = jest.fn(() => {});
        const type = jest.fn(() => { return { send } });

        handlers[0]({}, { type, send }, []);

        expect(type.mock.calls[0]).toEqual(["text/html"]);
        expect(send.mock.calls[0]).toEqual(["<h1>Test body</h1>"]);
    });

    it("should properly create a static handler when content type not specified", () => {
        const handlers: Handler[] = buildHandlers([{
            type: ActionType.STATIC,
            parameters: {
                body: "{}"
            }
        }]);
        expect(handlers).toHaveLength(1);

        const send = jest.fn(() => {});
        const type = jest.fn(() => { return { send } });

        handlers[0]({}, { type, send }, []);

        expect(type.mock.calls[0]).toEqual(["application/json"]);
        expect(send.mock.calls[0]).toEqual(["{}"]);
    });
});
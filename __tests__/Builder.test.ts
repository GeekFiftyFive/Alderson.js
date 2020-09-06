import { buildHandlers } from "../src/Builder";
import { Handler } from "../src/types/Handler";

describe("Builder", () => {
    it("should create no handlers for an empty array", () => {
        const handlers: Handler[] = buildHandlers([]);
        expect(handlers).toHaveLength(0);
    })
});
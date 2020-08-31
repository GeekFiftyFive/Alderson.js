import { Config } from "../../src/interfaces/Config";
import { MockConfigBuilder } from "../../__mocks__/validation/mockConfigs";
import { validate } from "../../src/validation/ConfigValidator"

describe("ConfigValidator", () => {
    it("should pass when a config with just endpoints is used", () => {
        let config: Config = new MockConfigBuilder().withEndpoints().build();
        const errors = validate(config);
        expect(errors).toHaveLength(0);
    });
});
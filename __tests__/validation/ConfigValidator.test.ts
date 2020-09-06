import { Config } from "../../src/interfaces/Config";
import { MockConfigBuilder } from "../../__mocks__/validation/mockConfigs";
import { validate } from "../../src/validation/ConfigValidator"

describe("ConfigValidator", () => {
    it("should validate when a config with just endpoints is used", () => {
        const config: Config = new MockConfigBuilder().withEndpoints().build();
        const errors = validate(config);
        expect(errors).toHaveLength(0);
    });

    it("should validate when a valid endpoint is defined", () => {
        const config: Config = new MockConfigBuilder()
                                        .withEndpoints()
                                        .addValidEndpoint()
                                        .build();
        const errors = validate(config);
        expect(errors).toHaveLength(0);
    });

    it("should validate when a config with just actions is used", () => {
        const config: Config = new MockConfigBuilder().withActions().build();
        const errors = validate(config);
        expect(errors).toHaveLength(0);
    });

    it("should fail to validate an endpoint is missing uri", () => {
        const config: Config = new MockConfigBuilder()
                                        .withEndpoints()
                                        .addInvalidEndpoint("method", "actions")
                                        .build();
        const errors = validate(config);
        expect(errors).toHaveLength(1);
    });

    it("should fail to validate an endpoint is missing method", () => {
        const config: Config = new MockConfigBuilder()
                                        .withEndpoints()
                                        .addInvalidEndpoint("uri", "actions")
                                        .build();
        const errors = validate(config);
        expect(errors).toHaveLength(1);
    });

    it("should fail to validate an endpoint is missing actions", () => {
        const config: Config = new MockConfigBuilder()
                                        .withEndpoints()
                                        .addInvalidEndpoint("uri", "method")
                                        .build();
        const errors = validate(config);
        expect(errors).toHaveLength(1);
    });

    it("should fail to validate an endpoint is missing two fields", () => {
        const config: Config = new MockConfigBuilder()
                                        .withEndpoints()
                                        .addInvalidEndpoint("method")
                                        .build();
        const errors = validate(config);
        expect(errors).toHaveLength(2);
    });

    it("should fail to validate when no actions or endpoints are defined", () => {
        const config: Config = new MockConfigBuilder().build();
        const errors = validate(config);
        expect(errors).toHaveLength(1);
    });
    
    it("should fail to validate when both actions and endpoints are defined", () => {
        const config: Config = new MockConfigBuilder().withActions().withEndpoints().build();
        const errors = validate(config);
        expect(errors).toHaveLength(1);
    });
});
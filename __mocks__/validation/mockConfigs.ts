export class MockConfigBuilder {
    config: any = {};

    withEndpoints() {
        this.config.endpoints = [];
        return this;
    }

    withActions() {
        this.config.actions = [];
        return this;
    }

    withPort() {
        this.config.port = 8080;
        return this;
    }

    withOrigins() {
        this.config.origins = {};
        return this;
    }

    addValidEndpoint() {
        this.config.endpoints.push(
            {
                uri: "/index",
                method: "GET",
                actions: []
            }
        )

        return this;
    }

    addInvalidEndpoint(...definedFields: string[]) {
        let endpoint = {};

        definedFields.forEach(key => {
            (endpoint as any)[key] = key === "actions" ? [] : "";
        })

        this.config.endpoints.push(endpoint);
        return this;
    }

    build() {
        return this.config;
    }
}
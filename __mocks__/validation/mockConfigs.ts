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

    build() {
        return this.config;
    }
}
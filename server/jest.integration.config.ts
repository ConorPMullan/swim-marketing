const config = {
  globalSetup: "./test-utils/setupTests.js",
  globalTeardown: "./test-utils/teardown.js",
  clearMocks: true,
  testTimeout: 1500,
  testEnvironment: "node",
  preset: "ts-jest",
};

export default config;

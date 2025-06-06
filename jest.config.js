// jest.config.js
module.exports = {
  preset: 'ts-jest', // if using TypeScript
  testEnvironment: 'jest-environment-jsdom', // for React components
  setupFilesAfterEnv: ['./jest.setup.js'], // or wherever your setup file is
  moduleNameMapper: {
    // Handle CSS imports (if any)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Alias to match tsconfig paths if needed
    // Ensure these aliases match your actual tsconfig.json paths
    '^@/components/(.*)$': '<rootDir>/src/app/components/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/data/(.*)$': '<rootDir>/src/app/data/$1',
    // Add other aliases as necessary based on your project structure
  },
  // transformIgnorePatterns is important if you have ESM modules in node_modules
  // that need to be transformed. By default, node_modules are not transformed.
  // e.g., transformIgnorePatterns: ['/node_modules/(?!(some-es-module|another-es-module)/)'],

  // Coverage reporting configuration (optional)
  // collectCoverage: true,
  // coverageDirectory: 'coverage',
  // collectCoverageFrom: [
  //   'src/app/**/*.{ts,tsx}',
  //   '!src/app/**/*.test.{ts,tsx}', // Exclude test files
  //   '!src/app/api/**/route.ts', // Example: Exclude Next.js route handlers if they are hard to unit test
  // ],

  // For API tests that require a 'node' environment, you can either:
  // 1. Use a separate Jest config file.
  // 2. Override the environment per test file using a docblock:
  //    /**
  //     * @jest-environment node
  //     */
  // This is generally preferred for Next.js projects where components and API routes coexist.
};

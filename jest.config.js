module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
    '^@/utils/env$': '<rootDir>/src/utils/env.node.ts',
    '^../utils/env$': '<rootDir>/src/utils/env.node.ts',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-router|react-router-dom)/)',
  ],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  injectGlobals: true,
  setupFiles: ['<rootDir>/src/setupEnv.js'],
}; 
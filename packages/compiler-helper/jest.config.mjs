/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)test.ts?(x)'],
  transform: {
    '^.+tsx?$': ['@swc/jest'],
  },
  transformIgnorePatterns: [],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      diagnostics: true,
    },
  },
};

export default config;

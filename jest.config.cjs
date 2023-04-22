require('dotenv').config({ path: '.env.test' })
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  setupFilesAfterEnv: [
    '<rootDir>/_test_/mocks/envValues.ts'
  ],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/_test_/mocks/styleMock.ts'
  }
}

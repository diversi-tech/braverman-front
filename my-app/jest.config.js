module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    },
    transformIgnorePatterns: [
      'node_modules/(?!(axios|other-modules)/)'  
    ],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    setupFiles: ['<rootDir>/jest.setup.js']
  };
  


module.exports = {
    testEnvironment: 'node', // Use Node.js environment for server-side tests
    rootDir: './', // Set the root directory to the server folder
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '^@config/(.*)$': '<rootDir>/src/config/$1', // Alias for config folder
        '^@models/(.*)$': '<rootDir>/src/models/$1', // Alias for models folder
        '^@routes/(.*)$': '<rootDir>/src/routes/$1', // Alias for routes folder
    },

};
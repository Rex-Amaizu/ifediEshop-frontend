module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/frontend/tests", "<rootDir>/backend/tests"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

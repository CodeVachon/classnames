import type { Config } from "jest";

const config: Config = {
    verbose: false,
    roots: ["<rootDir>/src"],
    preset: "ts-jest",
    setupFilesAfterEnv: ["jest-extended/all"],
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(tsx|ts|js)"],
    transform: {
        "^.+\\.(ts|tsx)$": [
            "ts-jest",
            {
                tsconfig: "./tsconfig.json"
            }
        ]
    }
};

export default config;

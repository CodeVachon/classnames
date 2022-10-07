module.exports = module.exports = {
    env: {
        browser: true,
        node: true,
        jest: true
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020
    },
    plugins: ["@typescript-eslint", "jest-extended", "jest", "prettier"],
    extends: ["prettier"],
    rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
        "linebreak-style": ["error", "unix"],
        "no-console": [
            "error",
            {
                allow: ["info", "error", "debug"]
            }
        ],
        "prettier/prettier": "error",
        quotes: [
            "error",
            "double",
            {
                allowTemplateLiterals: true
            }
        ],
        semi: ["error", "always"]
    }
};

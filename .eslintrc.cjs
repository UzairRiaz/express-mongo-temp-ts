/* eslint-env node */
module.exports = {
    extends: [
        "plugin:@typescript-eslint/recommended",
        // "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    parserOptions: {
        project: './tsconfig.json'
    },
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
    },
};
module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: "module",
        project: "./tsconfig.json"
    },
    plugins: [
        "@typescript-eslint",
        "prettier"
    ],
    rules: {
        "prettier/prettier": "error",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-non-null-assertion": "warn"
    }
}

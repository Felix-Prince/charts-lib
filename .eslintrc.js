module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        "plugin:prettier/recommended",
        "plugin:react/recommended",
        "standard",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            tsx: true,
        },
        ecmaVersion: 11,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint", "prettier"],
    rules: {
        indent: [2, 4],
        semi: [2, "always"],
        quotes: [2, "double"],
        "prettier/prettier": 1,
    },
};

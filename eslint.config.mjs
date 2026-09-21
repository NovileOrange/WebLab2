import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
    eslint.configs.recommended,

    ...tseslint.configs.recommended,

    {
        files: ["src/**/*.ts"],

        languageOptions: {
            globals: {
                document: "readonly",
                window: "readonly",
                localStorage: "readonly",
                console: "readonly"
            }
        },

        rules: {
            "@typescript-eslint/no-namespace": "off"
        }
    },

    {
        files: ["tests/**/*.ts"],

        rules: {
            "@typescript-eslint/no-unused-expressions": "off"
        }
    },

    {
        ignores: [
            "dist/",
            "node_modules/"
        ]
    }
];
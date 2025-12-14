import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const eslintConfig = [
  js.configs.recommended,
  {
    files: ["**/*.{js,ts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
      },
      globals: {
        console: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        Buffer: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearTimeout: "readonly",
        clearInterval: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      "comma-dangle": [
        "error",
        {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "always-multiline",
          exports: "always-multiline",
          functions: "never",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": ["off"],
      semi: ["error", "always"],
      "arrow-parens": ["error", "as-needed"],
      indent: ["error", 4],
      "no-unused-vars": "off", // Use TypeScript's version
    },
  },
  {
    ignores: ["node_modules/**", "dist/**", "*.config.js", "*.config.mjs"],
  },
];

export default eslintConfig;

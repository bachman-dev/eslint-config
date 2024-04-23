import { config } from "./dist/index.js";
import tseslint from "typescript-eslint";

/*
 * NOTE: This is the ESLint Config for this project in particular. See src/index.ts to learn more about this shared
 * configuration.
 */

// @ts-check

export default tseslint.config(
  {
    ignores: ["dist/**"],
  },
  {
    extends: config({ language: "typescript", typeChecked: true }),
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "tsconfig.eslint.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    extends: config({ language: "javascript" }),
    files: ["**/*.js"],
  },
);

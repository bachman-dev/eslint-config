import bachmanDev from "./dist/index.js";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

/* NOTE: This is the ESLint Config for this project in particular. See src/index.ts to learn more about this shared
   configuration.
*/

// @ts-check

export default tseslint.config(
  {
    ignores: ["dist/**"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  bachmanDev({ language: "typescript" }),
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ["**/*.js"],
    ...bachmanDev({ language: "javascript-in-typescript" }),
  },
  eslintConfigPrettier,
);

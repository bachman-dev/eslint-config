import type { RuleMetadata } from "../types.js";

const javascriptWithinTypescript: RuleMetadata = {
  name: `JavaScript within TypeScript`,
  description: `This ruleset disables some typescript-eslint rules that may cause incorrect fixes in JavaScript files; it also enables ESLint rules for JavaScript files that are only available with type checking in typescript-eslint.`,
  rules: [
    {
      name: "@typescript-eslint/explicit-function-return-type",
      url: "https://typescript-eslint.io/rules/explicit-function-return-type",
      severity: "off",
    },
    {
      name: "@typescript-eslint/explicit-member-accessibility",
      url: "https://typescript-eslint.io/rules/explicit-member-accessibility",
      severity: "off",
    },
    {
      name: "@typescript-eslint/explicit-module-boundary-types",
      url: "https://typescript-eslint.io/rules/explicit-module-boundary-types",
      severity: "off",
    },
    {
      name: "consistent-return",
      url: "https://eslint.org/docs/latest/rules/consistent-return",
      severity: "error",
    },
    {
      name: "default-case",
      url: "https://eslint.org/docs/latest/rules/default-case",
      severity: "error",
    },
    {
      name: "dot-notation",
      url: "https://eslint.org/docs/latest/rules/dot-notation",
      severity: "error",
    },
    {
      name: "no-implied-eval",
      url: "https://eslint.org/docs/latest/rules/no-implied-eval",
      severity: "error",
    },
    {
      name: "no-throw-literal",
      url: "https://eslint.org/docs/latest/rules/no-throw-literal",
      severity: "error",
    },
  ],
};

export default javascriptWithinTypescript;

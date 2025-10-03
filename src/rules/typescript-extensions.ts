import {
  tsMaxParams,
  tsNoMagicNumbers,
  tsNoShadow,
  tsNoUnusedExpressions,
  tsNoUnusedVars,
  tsNoUseBeforeDefine,
  tsPreferDestructuring,
} from "../settings/shared.js";
import type { RuleMetadata } from "../types.js";

const typescriptExtensions: RuleMetadata = {
  name: "ESLint Extensions by typescript-eslint",
  description: `These rules are ESLint rule extensions provided by typescript-eslint, so they will work properly with TypeScript files. We disable any core ESLint rules that are extended here.`,
  admonishments: [
    {
      type: "note",
      text: `These rules/settings are only applied when the "language" config option is set to "typescript" .`,
    },
  ],
  rules: [
    // Possible Problems
    {
      name: "no-unused-vars",
      url: "https://eslint.org/docs/latest/rules/no-unused-vars",
      severity: "off",
    },
    {
      name: "@typescript-eslint/no-unused-vars",
      url: "https://typescript-eslint.io/rules/no-unused-vars/",
      severity: "error",
      settings: tsNoUnusedVars,
    },
    {
      name: "no-use-before-define",
      url: "https://eslint.org/docs/latest/rules/no-use-before-define",
      severity: "off",
    },
    {
      name: "@typescript-eslint/no-use-before-define",
      url: "https://typescript-eslint.io/rules/no-use-before-define",
      severity: "error",
      settings: tsNoUseBeforeDefine,
    },

    // Suggestions
    {
      name: "@typescript-eslint/class-methods-use-this",
      url: "https://typescript-eslint.io/rules/class-methods-use-this",
      severity: "error",
      settings: { ignoreClassesThatImplementAnInterface: "public-fields" },
    },
    {
      name: "@typescript-eslint/default-param-last",
      url: "https://typescript-eslint.io/rules/default-param-last",
      severity: "error",
    },
    {
      name: "@typescript-eslint/init-declarations",
      url: "https://typescript-eslint.io/rules/init-declarations",
      severity: "error",
    },
    {
      name: "@typescript-eslint/max-params",
      url: "https://typescript-eslint.io/rules/max-params",
      severity: "error",
      settings: tsMaxParams,
    },
    {
      name: "@typescript-eslint/no-loop-func",
      url: "https://typescript-eslint.io/rules/no-loop-func",
      severity: "error",
    },
    {
      name: "@typescript-eslint/no-magic-numbers",
      url: "https://typescript-eslint.io/rules/no-magic-numbers",
      severity: "error",
      settings: tsNoMagicNumbers,
    },
    {
      name: "@typescript-eslint/no-shadow",
      url: "https://typescript-eslint.io/rules/no-shadow",
      severity: "error",
      settings: tsNoShadow,
    },
    {
      name: "@typescript-eslint/no-unused-expressions",
      url: "https://typescript-eslint.io/rules/no-unused-expressions",
      severity: "error",
      settings: tsNoUnusedExpressions,
    },
    {
      name: "@typescript-eslint/prefer-destructuring",
      url: "https://typescript-eslint.io/rules/prefer-destructuring",
      severity: "error",
      settings: tsPreferDestructuring,
    },
    {
      name: "@typescript-eslint/return-await",
      url: "https://typescript-eslint.io/rules/return-await",
      severity: "error",
      settings: "always",
      admonishments: [
        {
          type: "note",
          text: `We require Promises to be "awaited" for better stack tracing, and because it's now slower in many JS runtimes (V8 for instance) to not await them. You can think of this rule acting as the opposite of ESLint's "no-return-await" rule.`,
        },
      ],
    },
  ],
};

export default typescriptExtensions;

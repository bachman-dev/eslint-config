import type { RuleMetadata } from "../types.js";

const handledByTypescript: RuleMetadata = {
  name: "Handled by TypeScript",
  description: `These are ESLint rules normally enabled by their "recommended" configuration that can be disabled for TypeScript files since they are handled by the TypeScript Compiler.`,
  rules: [
    {
      name: "no-dupe-class-members",
      url: "https://eslint.org/docs/latest/rules/no-dupe-class-members",
      severity: "off",
    },
    {
      name: "no-redeclare",
      url: "https://eslint.org/docs/latest/rules/no-redeclare",
      severity: "off",
    },
  ],
};

export default handledByTypescript;
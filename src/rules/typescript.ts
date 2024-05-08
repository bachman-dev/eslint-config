import type { RuleMetadata } from "../types.js";
import memberOrdering from "../settings/memberOrdering.js";
import namingConvention from "../settings/namingConvention.js";

const typescript: RuleMetadata = {
  name: "TypeScript Rules",
  description: `These rules come from typescript-eslint, and are specifically tailored for linting TypeScript code.`,
  admonishments: [
    {
      type: "note",
      text: `We extend from typescript-eslint's "strictTypeChecked" and "stylisticTypeChecked" lint rules, and override default settings on a couple of them.`,
    },
  ],
  rules: [
    {
      name: "@typescript-eslint/consistent-type-exports",
      url: "https://typescript-eslint.io/rules/consistent-type-exports",
      severity: "error",
      settings: {
        fixMixedExportsWithInlineTypeSpecifier: true,
      },
    },
    {
      name: "@typescript-eslint/consistent-type-imports",
      url: "https://typescript-eslint.io/rules/consistent-type-imports",
      severity: "error",
      settings: {
        prefer: "type-imports",
        disallowTypeAnnotations: true,
        fixStyle: "inline-type-imports",
      },
    },
    {
      name: "@typescript-eslint/explicit-function-return-type",
      url: "https://typescript-eslint.io/rules/explicit-function-return-type",
      severity: "error",
    },
    {
      name: "@typescript-eslint/explicit-member-accessibility",
      url: "https://typescript-eslint.io/rules/explicit-member-accessibility",
      severity: "error",
    },
    {
      name: "@typescript-eslint/explicit-module-boundary-types",
      url: "https://typescript-eslint.io/rules/explicit-module-boundary-types",
      severity: "error",
    },
    {
      name: "@typescript-eslint/member-ordering",
      url: "https://typescript-eslint.io/rules/member-ordering",
      severity: "error",
      settings: memberOrdering,
      admonishments: [
        {
          type: "tip",
          text: "See [memberOrdering.ts](/src/settings/memberOrdering.ts) for the member ordering rules.",
        },
      ],
    },
    {
      name: "@typescript-eslint/method-signature-style",
      url: "https://typescript-eslint.io/rules/method-signature-style",
      severity: "error",
    },
    {
      name: "@typescript-eslint/naming-convention",
      url: "https://typescript-eslint.io/rules/naming-convention",
      severity: "error",
      settings: namingConvention,
      admonishments: [
        {
          type: "tip",
          text: "See [namingConvention.ts](/src/settings/namingConvention.ts) for the exact naming convention.",
        },
      ],
    },
    {
      name: "@typescript-eslint/no-import-type-side-effects",
      url: "https://typescript-eslint.io/rules/no-import-type-side-effects",
      severity: "error",
    },
    {
      name: "@typescript-eslint/no-require-imports",
      url: "https://typescript-eslint.io/rules/no-require-imports",
      severity: "error",
    },
    {
      name: "@typescript-eslint/no-unnecessary-qualifier",
      url: "https://typescript-eslint.io/rules/no-unnecessary-qualifier",
      severity: "error",
    },
    {
      name: "@typescript-eslint/no-unsafe-unary-minus",
      url: "https://typescript-eslint.io/rules/no-unsafe-unary-minus",
      severity: "error",
    },

    {
      name: "@typescript-eslint/no-useless-empty-export",
      url: "https://typescript-eslint.io/rules/no-useless-empty-export",
      severity: "error",
    },
    {
      name: "@typescript-eslint/parameter-properties",
      url: "https://typescript-eslint.io/rules/parameter-properties",
      severity: "error",
      settings: {
        prefer: "parameter-property",
      },
      filteredWhen: (options) => options.requireParameterProperties === false,
      admonishments: [
        {
          type: "tip",
          text: `Older projects may need some work to adhere to this rule; you can set "requireParameterProperties" to "false," but updating the code to adhere to this rule should be done sooner than later.`,
        },
      ],
    },
    {
      name: "@typescript-eslint/prefer-enum-initializers",
      url: "https://typescript-eslint.io/rules/prefer-enum-initializers",
      severity: "error",
    },
    {
      name: "@typescript-eslint/prefer-find",
      url: "https://typescript-eslint.io/rules/prefer-find",
      severity: "error",
    },
    {
      name: "@typescript-eslint/prefer-readonly",
      url: "https://typescript-eslint.io/rules/prefer-readonly",
      severity: "error",
    },
    {
      name: "@typescript-eslint/prefer-regexp-exec",
      url: "https://typescript-eslint.io/rules/prefer-regexp-exec",
      severity: "error",
    },
    {
      name: "@typescript-eslint/promise-function-async",
      url: "https://typescript-eslint.io/rules/promise-function-async",
      severity: "error",
    },
    {
      name: "@typescript-eslint/require-array-sort-compare",
      url: "https://typescript-eslint.io/rules/require-array-sort-compare",
      severity: "error",
    },
    {
      name: "@typescript-eslint/restrict-template-expressions",
      url: "https://typescript-eslint.io/rules/restrict-template-expressions",
      severity: "error",
      settings: { allowNumber: true, allowBoolean: true },
      admonishments: [
        {
          type: "note",
          text: `Although typescript-eslint's "strictTypeChecked" configuration makes this rule rather... strict, we do allow numbers and booleans to be in template literals as their stringified versions are easy enough to read.`,
        },
      ],
    },
    {
      name: "@typescript-eslint/sort-type-constituents",
      url: "https://typescript-eslint.io/rules/sort-type-constituents",
      severity: "error",
    },
    {
      name: "@typescript-eslint/strict-boolean-expressions",
      url: "https://typescript-eslint.io/rules/strict-boolean-expressions",
      severity: "error",
    },
    {
      name: "@typescript-eslint/switch-exhaustiveness-check",
      url: "https://typescript-eslint.io/rules/switch-exhaustiveness-check",
      severity: "error",
      settings: {
        allowDefaultCaseForExhaustiveSwitch: true,
        requireDefaultForNonUnion: true,
      },
    },
  ],
};

export default typescript;

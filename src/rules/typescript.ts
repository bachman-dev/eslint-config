import type { RuleMetadata } from "../types.js";
import allowPascalCaseConstants from "../settings/naming-conventions/allow-pascal-case-constants.js";
import defaultNamingConvention from "../settings/naming-conventions/default.js";
import memberOrdering from "../settings/member-ordering.js";

const typescript: RuleMetadata = {
  name: "TypeScript Rules",
  description: `These rules come from typescript-eslint, and are specifically tailored for linting TypeScript code.`,
  admonishments: [
    {
      type: "note",
      text: `These rules/settings are only applied when the "language" config option is set to "typescript" .`,
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
      filteredWhen: (options) =>
        typeof options.namingConvention !== "undefined" && options.namingConvention !== "default",
      settings: defaultNamingConvention,
      admonishments: [
        {
          type: "tip",
          text: "This is the default naming convention, used when `namingConvention` is not provided or set to `default`. See [naming-conventions.md](/src/rules/naming-conventions.md) for the exact naming convention.",
        },
      ],
    },
    {
      name: "@typescript-eslint/naming-convention",
      url: "https://typescript-eslint.io/rules/naming-convention",
      severity: "error",
      filteredWhen: (options) => options.namingConvention !== "allow-pascal-case-constants",
      settings: allowPascalCaseConstants,
      admonishments: [
        {
          type: "tip",
          text: "This naming convention allows for PascalCase constants, particularly for defining schema types alongside TypeScript types for runtime validation; set `namingConvention` in the options to `allow-pascal-case-constants` to use it. See [naming-conventions.md](/src/rules/naming-conventions.md) for the exact naming convention.",
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
      name: "@typescript-eslint/no-unsafe-type-assertion",
      url: "https://typescript-eslint.io/rules/no-unsafe-type-assertion",
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
        prefer: "class-property",
      },
    },
    {
      name: "@typescript-eslint/prefer-enum-initializers",
      url: "https://typescript-eslint.io/rules/prefer-enum-initializers",
      severity: "error",
    },
    {
      name: "@typescript-eslint/prefer-readonly",
      url: "https://typescript-eslint.io/rules/prefer-readonly",
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
      settings: {
        allow: [{ name: ["Error", "URL", "URLSearchParams"], from: "lib" }],
        allowNumber: true,
        allowBoolean: true,
      },
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
        considerDefaultExhaustiveForUnions: true,
        requireDefaultForNonUnion: true,
      },
    },
  ],
};

export default typescript;

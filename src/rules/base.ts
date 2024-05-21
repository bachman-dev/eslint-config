import {
  jsMaxParams,
  jsNoMagicNumbers,
  jsNoShadow,
  jsNoUnusedExpressions,
  jsNoUnusedVars,
  jsNoUseBeforeDefine,
  jsPreferDestructuring,
} from "../settings/shared.js";
import type { RuleMetadata } from "../types.js";
import noRestrictedSyntax from "../settings/noRestrictedSyntax.js";

const baseRules: RuleMetadata = {
  name: "Base (JS/TS) Rules",
  description: "These rules come from ESLint's core ruleset, covering JavaScript and some TypeScript code.",
  rules: [
    // Possible Problems
    {
      name: "array-callback-return",
      url: "https://eslint.org/docs/latest/rules/array-callback-return",
      severity: "error",
    },
    {
      name: "no-await-in-loop",
      url: "https://eslint.org/docs/latest/rules/no-await-in-loop",
      severity: "error",
      admonishments: [
        {
          type: "tip",
          text: "If you want to process an asynchronous task in series over a set of items, you can disable this rule on that line.",
        },
      ],
    },
    {
      name: "no-constructor-return",
      url: "https://eslint.org/docs/latest/rules/no-constructor-return",
      severity: "error",
    },
    {
      name: "no-duplicate-imports",
      url: "https://eslint.org/docs/latest/rules/no-duplicate-imports",
      severity: "error",
    },
    {
      name: "no-promise-executor-return",
      url: "https://eslint.org/docs/latest/rules/no-promise-executor-return",
      severity: "error",
    },
    {
      name: "no-self-compare",
      url: "https://eslint.org/docs/latest/rules/no-self-compare",
      severity: "error",
    },
    {
      name: "no-template-curly-in-string",
      url: "https://eslint.org/docs/latest/rules/no-template-curly-in-string",
      severity: "error",
    },
    {
      name: "no-unmodified-loop-condition",
      url: "https://eslint.org/docs/latest/rules/no-unmodified-loop-condition",
      severity: "error",
    },
    {
      name: "no-unreachable-loop",
      url: "https://eslint.org/docs/latest/rules/no-unreachable-loop",
      severity: "error",
    },
    {
      name: "no-unused-vars",
      url: "https://eslint.org/docs/latest/rules/no-unused-vars",
      severity: "error",
      settings: jsNoUnusedVars,
      filteredWhen: (options) => options.language === "typescript" || options.language === "javascript-in-typescript",
      admonishments: [
        {
          type: "tip",
          text: "This expands upon ESLint's recommended configuration by allowing variables with an underscore (_) to be unused.",
        },
        {
          type: "note",
          text: `See the entry for "@typescript-eslint/no-unused-vars" for TypeScript files.`,
        },
        {
          type: "note",
          text: "When ESLint 9 is supported, this rule will also report any variables with underscores (_) that are used.",
        },
      ],
    },
    {
      name: "no-use-before-define",
      url: "https://eslint.org/docs/latest/rules/no-use-before-define",
      severity: "error",
      settings: jsNoUseBeforeDefine,
      filteredWhen: (options) => options.language === "typescript",
      admonishments: [
        {
          type: "note",
          text: `See the entry for "@typescript-eslint/no-use-before-define" for TypeScript files.`,
        },
      ],
    },
    {
      name: "no-useless-assignment",
      url: "https://eslint.org/docs/latest/rules/no-useless-assignment",
      //TODO: ESLint 9.0 Support
      severity: "off",
      admonishments: [
        {
          type: "note",
          text: "This rule is currently disabled; it will be enabled once ESLint 9 is supported.",
        },
      ],
    },
    {
      name: "require-atomic-updates",
      url: "https://eslint.org/docs/latest/rules/require-atomic-updates",
      severity: "error",
    },

    // Suggestions
    {
      name: "accessor-pairs",
      url: "https://eslint.org/docs/latest/rules/accessor-pairs",
      severity: "error",
    },
    {
      name: "arrow-body-style",
      url: "https://eslint.org/docs/latest/rules/arrow-body-style",
      severity: "error",
      settings: ["as-needed", { requireReturnForObjectLiteral: true }],
    },
    {
      name: "block-scoped-var",
      url: "https://eslint.org/docs/latest/rules/block-scoped-var",
      severity: "error",
    },
    {
      name: "capitalized-comments",
      url: "https://eslint.org/docs/latest/rules/capitalized-comments",
      severity: "error",
      settings: ["always", { ignoreConsecutiveComments: true }],
    },
    {
      name: "class-methods-use-this",
      url: "https://eslint.org/docs/latest/rules/class-methods-use-this",
      severity: "error",
      filteredWhen: (options) => options.language === "typescript",
      admonishments: [
        {
          type: "note",
          text: `See the entry for "@typescript-eslint/class-methods-use-this" for TypeScript files.`,
        },
      ],
    },
    {
      name: "consistent-return",
      url: "https://eslint.org/docs/latest/rules/consistent-return",
      severity: "error",
      filteredWhen: (options) => options.language === "typescript",
      admonishments: [
        {
          type: "note",
          text: `This rule is only enforced with plain JavaScript files; TypeScript should be configured with the "noImplicitReturns" compiler option enabled.`,
        },
      ],
    },
    {
      name: "consistent-this",
      url: "https://eslint.org/docs/latest/rules/consistent-this",
      severity: "error",
    },
    {
      name: "curly",
      url: "https://eslint.org/docs/latest/rules/curly",
      severity: "error",
    },
    {
      name: "default-case",
      url: "https://eslint.org/docs/latest/rules/default-case",
      severity: "error",
      filteredWhen: (options) => options.language === "typescript",
      admonishments: [
        {
          type: "note",
          text: `This rule is only enforced with plain JavaScript files; for TypeScript files, the typescript-eslint rule "switch-exhaustiveness-check" will make sure a default case is in place when needed.`,
        },
      ],
    },
    {
      name: "default-case-last",
      url: "https://eslint.org/docs/latest/rules/default-case-last",
      severity: "error",
    },
    {
      name: "default-param-last",
      url: "https://eslint.org/docs/latest/rules/default-param-last",
      severity: "error",
      filteredWhen: (options) => options.language === "typescript",
      admonishments: [
        {
          type: "note",
          text: `See the entry for "@typescript-eslint/default-param-last" for TypeScript files.`,
        },
      ],
    },
    {
      name: "dot-notation",
      url: "https://eslint.org/docs/latest/rules/dot-notation",
      severity: "error",
      filteredWhen: (options) => options.language === "typescript",
      admonishments: [
        {
          type: "note",
          text: `For TypeScript code, this rule is enabled by typescript-eslint's "stylisticTypeChecked" configuration`,
        },
      ],
    },
    {
      name: "eqeqeq",
      url: "https://eslint.org/docs/latest/rules/eqeqeq",
      severity: "error",
    },
    {
      name: "func-name-matching",
      url: "https://eslint.org/docs/latest/rules/func-name-matching",
      severity: "error",
    },
    {
      name: "func-style",
      url: "https://eslint.org/docs/latest/rules/func-style",
      severity: "error",
      settings: ["declaration", { allowArrowFunctions: true }],
    },
    {
      name: "grouped-accessor-pairs",
      url: "https://eslint.org/docs/latest/rules/grouped-accessor-pairs",
      severity: "error",
      settings: "getBeforeSet",
    },
    {
      name: "guard-for-in",
      url: "https://eslint.org/docs/latest/rules/guard-for-in",
      severity: "error",
    },
    {
      name: "id-length",
      url: "https://eslint.org/docs/latest/rules/id-length",
      severity: "error",
      settings: { min: 3, exceptions: ["t"], properties: "never" },
      admonishments: [
        {
          type: "note",
          text: `This rule makes an exception for "t" to be used as a translation (as in localization) function; we also ignore properties on objects. Otherwise, all IDs must be 3 characters or longer`,
        },
      ],
    },
    {
      name: "init-declarations",
      url: "https://eslint.org/docs/latest/rules/init-declarations",
      severity: "error",
      filteredWhen: (options) => options.language === "typescript",
      admonishments: [
        {
          type: "note",
          text: `See the entry for "@typescript-eslint/init-declarations" for TypeScript files.`,
        },
      ],
    },
    {
      name: "logical-assignment-operators",
      url: "https://eslint.org/docs/latest/rules/logical-assignment-operators",
      severity: "error",
    },
    {
      name: "max-classes-per-file",
      url: "https://eslint.org/docs/latest/rules/max-classes-per-file",
      severity: "error",
    },
    {
      name: "max-lines",
      url: "https://eslint.org/docs/latest/rules/max-lines",
      severity: "error",
      settings: { max: 10_000, skipBlankLines: true, skipComments: true },
    },
    {
      name: "max-lines-per-function",
      url: "https://eslint.org/docs/latest/rules/max-lines-per-function",
      severity: "error",
      settings: { max: 1000, skipBlankLines: true, skipComments: true },
    },
    {
      name: "max-nested-callbacks",
      url: "https://eslint.org/docs/latest/rules/max-nested-callbacks",
      severity: "error",
    },
    {
      name: "max-params",
      url: "https://eslint.org/docs/latest/rules/max-params",
      severity: "error",
      settings: jsMaxParams,
      filteredWhen: (options) => options.language === "typescript",
      admonishments: [
        {
          type: "note",
          text: `See the entry for "@typescript-eslint/max-params" for TypeScript files.`,
        },
      ],
    },
    {
      name: "multiline-comment-style",
      url: "https://eslint.org/docs/latest/rules/multiline-comment-style",
      severity: "error",
      settings: "bare-block",
    },
    {
      name: "new-cap",
      url: "https://eslint.org/docs/latest/rules/new-cap",
      severity: "error",
      settings: { newIsCapExceptions: ["ctor"] },
      admonishments: [
        {
          type: "tip",
          text: `Use the designated word "ctor" to represent a generic class constructor method, such as when used as a parameter in a function.`,
        },
      ],
    },
    {
      name: "no-array-constructor",
      url: "https://eslint.org/docs/latest/rules/no-array-constructor",
      severity: "error",
      filteredWhen: (options) => options.language === "typescript",
      admonishments: [
        {
          type: "note",
          text: `For TypeScript code, this rule is enabled by typescript-eslint's "recommended" configuration`,
        },
      ],
    },
    {
      name: "no-bitwise",
      url: "https://eslint.org/docs/latest/rules/no-bitwise",
      severity: "error",
      filteredWhen: (options) => options.allowBitwise === true,
      admonishments: [
        {
          type: "tip",
          text: `This rule helps prevent typos with logical operations like && or ||, but some projects (such as Discord apps) may require a ton of bitwise operations; you can set "allowBitwise" to "true" when extending from this config to disable this rule.`,
        },
      ],
    },
    {
      name: "no-caller",
      url: "https://eslint.org/docs/latest/rules/no-caller",
      severity: "error",
    },
    {
      name: "no-console",
      url: "https://eslint.org/docs/latest/rules/no-console",
      severity: "error",
      filteredWhen: (options) => options.allowConsole === true,
      admonishments: [
        {
          type: "warning",
          text: `Logging via the built-in "console" object can be convenient, but usually leads to excess outputs hanging around; it's best to use a logging framework (or make your own service, disabling this rule in your own methods) so that logging is centralized, configurable, and not (as often) subject to misplaced log-prints that make it into production. All that in mind, if you really want to bypass this rule and go without an abstracted logging framework/service, you may set "allowConsole" to "true" when extending this configuration.`,
        },
      ],
    },
    {
      name: "no-continue",
      url: "https://eslint.org/docs/latest/rules/no-continue",
      severity: "error",
    },
    {
      name: "no-div-regex",
      url: "https://eslint.org/docs/latest/rules/no-div-regex",
      severity: "error",
    },
    {
      name: "no-else-return",
      url: "https://eslint.org/docs/latest/rules/no-else-return",
      severity: "error",
    },
    {
      name: "no-empty-function",
      url: "https://eslint.org/docs/latest/rules/no-empty-function",
      severity: "error",
      filteredWhen: (options) => options.language === "typescript",
      admonishments: [
        {
          type: "note",
          text: `For TypeScript code, this rule is enabled by typescript-eslint's "stylistic" configuration`,
        },
      ],
    },
    {
      name: "no-eq-null",
      url: "https://eslint.org/docs/latest/rules/no-eq-null",
      severity: "error",
    },
    {
      name: "no-eval",
      url: "https://eslint.org/docs/latest/rules/no-eval",
      severity: "error",
    },
    {
      name: "no-extend-native",
      url: "https://eslint.org/docs/latest/rules/no-extend-native",
      severity: "error",
    },
    {
      name: "no-extra-bind",
      url: "https://eslint.org/docs/latest/rules/no-extra-bind",
      severity: "error",
    },
    {
      name: "no-extra-label",
      url: "https://eslint.org/docs/latest/rules/no-extra-label",
      severity: "error",
    },
    {
      name: "no-implicit-coercion",
      url: "https://eslint.org/docs/latest/rules/no-implicit-coercion",
      severity: "error",
    },
    {
      name: "no-implicit-globals",
      url: "https://eslint.org/docs/latest/rules/no-implicit-globals",
      severity: "error",
      settings: { lexicalBindings: true },
    },
    {
      name: "no-implied-eval",
      url: "https://eslint.org/docs/latest/rules/no-implied-eval",
      severity: "error",
    },
    {
      name: "no-inline-comments",
      url: "https://eslint.org/docs/latest/rules/no-inline-comments",
      severity: "error",
    },
    {
      name: "no-invalid-this",
      url: "https://eslint.org/docs/latest/rules/no-invalid-this",
      severity: "error",
      filteredWhen: (options) => options.language === "typescript",
      admonishments: [
        {
          type: "note",
          text: `This rule is only enforced with plain JavaScript files; the TypeScript Compiler checks for this error.`,
        },
      ],
    },
    {
      name: "no-iterator",
      url: "https://eslint.org/docs/latest/rules/no-iterator",
      severity: "error",
    },
    {
      name: "no-label-var",
      url: "https://eslint.org/docs/latest/rules/no-label-var",
      severity: "error",
    },
    {
      name: "no-labels",
      url: "https://eslint.org/docs/latest/rules/no-labels",
      severity: "error",
      settings: { allowLoop: true, allowSwitch: false },
    },
    {
      name: "no-lone-blocks",
      url: "https://eslint.org/docs/latest/rules/no-lone-blocks",
      severity: "error",
    },
    {
      name: "no-lonely-if",
      url: "https://eslint.org/docs/latest/rules/no-lonely-if",
      severity: "error",
    },
    {
      name: "no-loop-func",
      url: "https://eslint.org/docs/latest/rules/no-loop-func",
      severity: "error",
      filteredWhen: (options) => options.language === "typescript",
      admonishments: [
        {
          type: "note",
          text: `See the entry for "@typescript-eslint/no-loop-func" for TypeScript files.`,
        },
      ],
    },
    {
      name: "no-magic-numbers",
      url: "https://eslint.org/docs/latest/rules/no-magic-numbers",
      severity: "error",
      settings: jsNoMagicNumbers,
      filteredWhen: (options) => options.language === "typescript" || options.language === "javascript-in-typescript",
      admonishments: [
        {
          type: "note",
          text: `See the entry for "@typescript-eslint/no-magic-numbers" for TypeScript files.`,
        },
      ],
    },
    {
      name: "no-multi-assign",
      url: "https://eslint.org/docs/latest/rules/no-multi-assign",
      severity: "error",
    },
    {
      name: "no-multi-str",
      url: "https://eslint.org/docs/latest/rules/no-multi-str",
      severity: "error",
    },
    {
      name: "no-negated-condition",
      url: "https://eslint.org/docs/latest/rules/no-negated-condition",
      severity: "error",
    },
    {
      name: "no-nested-ternary",
      url: "https://eslint.org/docs/latest/rules/no-nested-ternary",
      severity: "error",
    },
    {
      name: "no-new",
      url: "https://eslint.org/docs/latest/rules/no-new",
      severity: "error",
    },
    {
      name: "no-new-func",
      url: "https://eslint.org/docs/latest/rules/no-new-func",
      severity: "error",
    },
    {
      name: "no-new-wrappers",
      url: "https://eslint.org/docs/latest/rules/no-new-wrappers",
      severity: "error",
    },
    {
      name: "no-object-constructor",
      url: "https://eslint.org/docs/latest/rules/no-object-constructor",
      severity: "error",
    },
    {
      name: "no-octal-escape",
      url: "https://eslint.org/docs/latest/rules/no-octal-escape",
      severity: "error",
    },
    {
      name: "no-param-reassign",
      url: "https://eslint.org/docs/latest/rules/no-param-reassign",
      severity: "error",
    },
    {
      name: "no-plusplus",
      url: "https://eslint.org/docs/latest/rules/no-plusplus",
      severity: "error",
      settings: { allowForLoopAfterthoughts: true },
    },
    {
      name: "no-proto",
      url: "https://eslint.org/docs/latest/rules/no-proto",
      severity: "error",
    },
    {
      name: "no-restricted-syntax",
      url: "https://eslint.org/docs/latest/rules/no-restricted-syntax",
      severity: "error",
      settings: noRestrictedSyntax,
      admonishments: [
        {
          type: "tip",
          text: "See [noRestrictedSyntax.ts](/src/settings/noRestrictedSyntax.ts) for the syntax this rule restricts.",
        },
      ],
    },
    {
      name: "no-return-assign",
      url: "https://eslint.org/docs/latest/rules/no-return-assign",
      severity: "error",
      settings: "always",
    },
    {
      name: "no-script-url",
      url: "https://eslint.org/docs/latest/rules/no-script-url",
      severity: "error",
    },
    {
      name: "no-sequences",
      url: "https://eslint.org/docs/latest/rules/no-sequences",
      severity: "error",
    },
    {
      name: "no-shadow",
      url: "https://eslint.org/docs/latest/rules/no-shadow",
      severity: "error",
      settings: jsNoShadow,
      filteredWhen: (options) => options.language === "typescript",
      admonishments: [
        {
          type: "note",
          text: `See the entry for "@typescript-eslint/no-shadow" for TypeScript files.`,
        },
      ],
    },
    {
      name: "no-throw-literal",
      url: "https://eslint.org/docs/latest/rules/no-throw-literal",
      severity: "error",
      filteredWhen: (options) => options.language === "typescript",
      admonishments: [
        {
          type: "note",
          text: `For TypeScript code, typescript-eslint's "strictTypeChecked" configuration covers this issue with its "only-throw-error" rule.`,
        },
      ],
    },
    {
      name: "no-undef-init",
      url: "https://eslint.org/docs/latest/rules/no-undef-init",
      severity: "error",
    },
    {
      name: "no-undefined",
      url: "https://eslint.org/docs/latest/rules/no-undefined",
      severity: "error",
    },
    {
      name: "no-unneeded-ternary",
      url: "https://eslint.org/docs/latest/rules/no-unneeded-ternary",
      severity: "error",
    },
    {
      name: "no-unused-expressions",
      url: "https://eslint.org/docs/latest/rules/no-unused-expressions#options",
      severity: "error",
      settings: jsNoUnusedExpressions,
      filteredWhen: (options) => options.language === "typescript",
      admonishments: [
        {
          type: "note",
          text: `See the entry for "@typescript-eslint/no-unused-expressions" for TypeScript files.`,
        },
      ],
    },
    {
      name: "no-useless-call",
      url: "https://eslint.org/docs/latest/rules/no-useless-call",
      severity: "error",
    },
    {
      name: "no-useless-computed-key",
      url: "https://eslint.org/docs/latest/rules/no-useless-computed-key",
      severity: "error",
    },
    {
      name: "no-useless-concat",
      url: "https://eslint.org/docs/latest/rules/no-useless-concat",
      severity: "error",
    },
    {
      name: "no-useless-constructor",
      url: "https://eslint.org/docs/latest/rules/no-useless-constructor",
      severity: "error",
      filteredWhen: (options) => options.language === "typescript",
      admonishments: [
        {
          type: "note",
          text: `For TypeScript code, this rule is enabled by typescript-eslint's "strict" configuration`,
        },
      ],
    },
    {
      name: "no-useless-rename",
      url: "https://eslint.org/docs/latest/rules/no-useless-rename",
      severity: "error",
    },
    {
      name: "no-useless-return",
      url: "https://eslint.org/docs/latest/rules/no-useless-return",
      severity: "error",
    },
    {
      name: "no-var",
      url: "https://eslint.org/docs/latest/rules/no-var",
      severity: "error",
    },
    {
      name: "no-void",
      url: "https://eslint.org/docs/latest/rules/no-void",
      severity: "error",
    },
    {
      name: "no-warning-comments",
      url: "https://eslint.org/docs/latest/rules/no-warning-comments",
      severity: "error",
      settings: { terms: ["fixme"] },
      admonishments: [
        {
          type: "tip",
          text: `We use FIXME as a designated comment keyword to indicate something should be fixed before pushing the code to production.`,
        },
      ],
    },
    {
      name: "object-shorthand",
      url: "https://eslint.org/docs/latest/rules/object-shorthand",
      severity: "error",
    },
    {
      name: "one-var",
      url: "https://eslint.org/docs/latest/rules/one-var",
      severity: "error",
      settings: "never",
    },
    {
      name: "operator-assignment",
      url: "https://eslint.org/docs/latest/rules/operator-assignment",
      severity: "error",
      settings: "always",
    },
    {
      name: "prefer-arrow-callback",
      url: "https://eslint.org/docs/latest/rules/prefer-arrow-callback",
      severity: "error",
    },
    {
      name: "prefer-const",
      url: "https://eslint.org/docs/latest/rules/prefer-const",
      severity: "error",
    },
    {
      name: "prefer-destructuring",
      url: "https://eslint.org/docs/latest/rules/prefer-destructuring",
      severity: "error",
      settings: jsPreferDestructuring,
      filteredWhen: (options) => options.language === "typescript",
      admonishments: [
        {
          type: "note",
          text: `See the entry for "@typescript-eslint/prefer-destructuring" for TypeScript files.`,
        },
      ],
    },
    {
      name: "prefer-exponentiation-operator",
      url: "https://eslint.org/docs/latest/rules/prefer-exponentiation-operator",
      severity: "error",
    },
    {
      name: "prefer-named-capture-group",
      url: "https://eslint.org/docs/latest/rules/prefer-named-capture-group",
      severity: "error",
    },
    {
      name: "prefer-numeric-literals",
      url: "https://eslint.org/docs/latest/rules/prefer-numeric-literals",
      severity: "error",
    },
    {
      name: "prefer-object-has-own",
      url: "https://eslint.org/docs/latest/rules/prefer-object-has-own",
      severity: "error",
    },
    {
      name: "prefer-object-spread",
      url: "https://eslint.org/docs/latest/rules/prefer-object-spread",
      severity: "error",
    },
    {
      name: "prefer-promise-reject-errors",
      url: "https://eslint.org/docs/latest/rules/prefer-promise-reject-errors",
      severity: "error",
    },
    {
      name: "prefer-regex-literals",
      url: "https://eslint.org/docs/latest/rules/prefer-regex-literals",
      severity: "error",
    },
    {
      name: "prefer-rest-params",
      url: "https://eslint.org/docs/latest/rules/prefer-rest-params",
      severity: "error",
    },
    {
      name: "prefer-spread",
      url: "https://eslint.org/docs/latest/rules/prefer-spread",
      severity: "error",
    },
    {
      name: "prefer-template",
      url: "https://eslint.org/docs/latest/rules/prefer-template",
      severity: "error",
    },
    {
      name: "radix",
      url: "https://eslint.org/docs/latest/rules/radix",
      severity: "error",
    },
    {
      name: "require-await",
      url: "https://eslint.org/docs/latest/rules/require-await",
      severity: "error",
      filteredWhen: (options) => options.language === "typescript",
      admonishments: [
        {
          type: "note",
          text: `For TypeScript code, this rule is enabled by typescript-eslint's "recommended-type-checked" configuration`,
        },
      ],
    },
    {
      name: "require-unicode-regexp",
      url: "https://eslint.org/docs/latest/rules/require-unicode-regexp",
      severity: "error",
    },
    {
      name: "sort-imports",
      url: "https://eslint.org/docs/latest/rules/sort-imports",
      severity: "error",
    },
    {
      name: "strict",
      url: "https://eslint.org/docs/latest/rules/strict",
      severity: "error",
    },
    {
      name: "symbol-description",
      url: "https://eslint.org/docs/latest/rules/symbol-description",
      severity: "error",
    },
    {
      name: "yoda",
      url: "https://eslint.org/docs/latest/rules/yoda",
      severity: "error",
    },

    // Formatting
    {
      name: "line-comment-position",
      url: "https://eslint.org/docs/latest/rules/line-comment-position",
      severity: "error",
    },
    {
      name: "unicode-bom",
      url: "https://eslint.org/docs/latest/rules/unicode-bom",
      severity: "error",
    },
  ],
};

export default baseRules;

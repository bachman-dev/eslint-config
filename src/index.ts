import type { TSESLint } from "@typescript-eslint/utils";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import settings from "./settings/index.js";
import tseslint from "typescript-eslint";

export interface ConfigOptions {
  language: "javascript" | "typescript";
  allowBitwise?: boolean;
  allowConsole?: boolean;
  typeChecked?: boolean;
}

export function config(options: ConfigOptions): TSESLint.FlatConfig.ConfigArray {
  const configArray: TSESLint.FlatConfig.ConfigArray = tseslint.config(eslint.configs.recommended, {
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
    rules: {
      // Possible Problems

      "array-callback-return": "error",
      "no-await-in-loop": "error",
      "no-constructor-return": "error",
      "no-duplicate-imports": "error",
      "no-promise-executor-return": "error",
      "no-self-compare": "error",
      "no-template-curly-in-string": "error",
      "no-unmodified-loop-condition": "error",
      "no-unreachable-loop": "error",
      "no-unused-vars": ["error", settings.possibleProblems.noUnusedVars],
      "no-use-before-define": ["error", settings.possibleProblems.noUseBeforeDefine],
      // TODO: ESLint 9.0 Support -- "no-useless-assignment": "error",
      "require-atomic-updates": "error",

      // Suggestions

      "accessor-pairs": "error",
      "arrow-body-style": ["error", ...settings.suggestions.arrowBodyStyle],
      "block-scoped-var": "error",
      "capitalized-comments": ["error", ...settings.suggestions.capitalizedComments],
      "class-methods-use-this": "error",
      "consistent-this": "error",
      curly: "error",
      "default-case-last": "error",
      "default-param-last": "error",
      "dot-notation": "error",
      eqeqeq: "error",
      "func-name-matching": "error",
      "func-style": ["error", ...settings.suggestions.funcStyle],
      "grouped-accessor-pairs": ["error", settings.suggestions.groupedAccessorPairs],
      "guard-for-in": "error",
      "id-length": ["error", settings.suggestions.idLength],
      "init-declarations": "error",
      "logical-assignment-operators": "error",
      "max-classes-per-file": "error",
      "max-lines": ["error", settings.suggestions.maxLines],
      "max-lines-per-function": ["error", settings.suggestions.maxLinesPerFunction],
      "max-nested-callbacks": "error",
      "max-params": ["error", settings.suggestions.maxParams],
      "multiline-comment-style": "error",
      "new-cap": ["error", settings.suggestions.newCap],
      "no-array-constructor": "error",
      "no-caller": "error",
      "no-continue": "error",
      "no-div-regex": "error",
      "no-else-return": "error",
      "no-empty-function": "error",
      "no-eq-null": "error",
      "no-eval": "error",
      "no-extend-native": "error",
      "no-extra-bind": "error",
      "no-extra-label": "error",
      "no-implicit-coercion": "error",
      "no-implicit-globals": ["error", settings.suggestions.noImplicitGlobals],
      "no-implied-eval": "error",
      "no-inline-comments": "error",
      "no-invalid-this": "error",
      "no-iterator": "error",
      "no-label-var": "error",
      "no-labels": ["error", settings.suggestions.noLabels],
      "no-lone-blocks": "error",
      "no-lonely-if": "error",
      "no-loop-func": "error",
      "no-magic-numbers": ["error", settings.suggestions.noMagicNumbers],
      "no-multi-assign": "error",
      "no-multi-str": "error",
      "no-negated-condition": "error",
      "no-nested-ternary": "error",
      "no-new": "error",
      "no-new-func": "error",
      "no-new-wrappers": "error",
      "no-object-constructor": "error",
      "no-octal-escape": "error",
      "no-param-reassign": "error",
      "no-plusplus": ["error", settings.suggestions.noPlusPlus],
      "no-proto": "error",
      "no-restricted-syntax": ["error", ...settings.suggestions.noRestrictedSyntax],
      "no-return-assign": ["error", settings.suggestions.noReturnAssign],
      "no-script-url": "error",
      "no-sequences": "error",
      "no-shadow": ["error", settings.suggestions.noShadow],
      "no-throw-literal": "error",
      "no-undef-init": "error",
      "no-undefined": "error",
      "no-unneeded-ternary": "error",
      "no-useless-call": "error",
      "no-useless-computed-key": "error",
      "no-useless-concat": "error",
      "no-useless-constructor": "error",
      "no-useless-rename": "error",
      "no-useless-return": "error",
      "no-var": "error",
      "no-void": "error",
      "no-warning-comments": ["error", settings.suggestions.noWarningComments],
      "object-shorthand": "error",
      "one-var": ["error", settings.suggestions.oneVar],
      "operator-assignment": ["error", settings.suggestions.operatorAssignment],
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "prefer-destructuring": ["error", settings.suggestions.preferDestructuring],
      "prefer-exponentiation-operator": "error",
      "prefer-named-capture-group": "error",
      "prefer-numeric-literals": "error",
      "prefer-object-has-own": "error",
      "prefer-object-spread": "error",
      "prefer-promise-reject-errors": "error",
      "prefer-regex-literals": "error",
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "prefer-template": "error",
      radix: "error",
      "require-await": "error",
      "require-unicode-regexp": "error",
      "sort-imports": "error",
      strict: "error",
      "symbol-description": "error",
      "vars-on-top": "error",
      yoda: "error",

      // Layout & Formatting

      "line-comment-position": "error",
      "unicode-bom": "error",
    },
  });

  const { language } = options;
  const isTypeChecked = options.typeChecked ?? false;
  const isBitwiseAllowed = options.allowBitwise ?? false;
  const isConsoleAllowed = options.allowConsole ?? false;

  if (language === "typescript") {
    if (isTypeChecked) {
      configArray.push(...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked, {
        rules: {
          // Type-Checked Rules
          "@typescript-eslint/consistent-type-exports": ["error", settings.typescript.consistentTypeExports],
          "@typescript-eslint/naming-convention": ["error", ...settings.typescript.namingConvention],
          "@typescript-eslint/no-unnecessary-qualifier": "error",
          "@typescript-eslint/no-unsafe-unary-minus": "error",
          "@typescript-eslint/prefer-find": "error",
          "@typescript-eslint/prefer-readonly": "error",
          "@typescript-eslint/prefer-regexp-exec": "error",
          "@typescript-eslint/promise-function-async": "error",
          "@typescript-eslint/require-array-sort-compare": "error",
          "@typescript-eslint/strict-boolean-expressions": "error",
          "@typescript-eslint/switch-exhaustiveness-check": ["error", settings.typescript.switchExhaustivenessCheck],

          // TypeScript ESLint Extensions

          // Suggestions
          "prefer-destructuring": "off",
          "@typescript-eslint/prefer-destructuring": "error",
          /*
           * The no-return-await rule was deprecated, but its TSESLint extension is still ueful when always requiring
           * return awaits.
           */
          "@typescript-eslint/return-await": ["error", settings.typescript.returnAwait],
        },
      });
    } else {
      configArray.push(...tseslint.configs.strict, ...tseslint.configs.stylistic);
    }
    configArray.push({
      rules: {
        // TypeScript Rules
        "@typescript-eslint/consistent-type-imports": ["error", settings.typescript.consistentTypeImports],
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/explicit-member-accessibility": "error",
        "@typescript-eslint/explicit-module-boundary-types": "error",
        "@typescript-eslint/member-ordering": ["error", settings.typescript.memberOrdering],
        "@typescript-eslint/method-signature-style": "error",
        "@typescript-eslint/no-import-type-side-effects": "error",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-useless-empty-export": "error",
        // TODO: Make a final decision on parameter-properties
        "@typescript-eslint/parameter-properties": "error",
        "@typescript-eslint/prefer-enum-initializers": "error",
        "@typescript-eslint/sort-type-constituents": "error",

        // Checked by the TypeScript Compiler
        "no-dupe-class-members": "off",
        "no-invalid-this": "off",
        "no-redeclare": "off",

        // TypeScript ESLint Extensions

        // Possible Problems
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error", settings.typescript.noUnusedVars],
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": "error",

        // Suggestions
        "class-methods-use-this": "off",
        "@typescript-eslint/class-methods-use-this": "error",
        "default-param-last": "off",
        "@typescript-eslint/default-param-last": "error",
        "init-declarations": "off",
        "@typescript-eslint/init-declarations": "error",
        "max-params": "off",
        "@typescript-eslint/max-params": ["error", settings.suggestions.maxParams],
        "no-loop-func": "off",
        "@typescript-eslint/no-loop-func": "error",
        "no-magic-numbers": "off",
        "@typescript-eslint/no-magic-numbers": ["error", settings.typescript.noMagicNumbers],
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error", settings.typescript.noShadow],
      },
    });
  } else {
    configArray.push({
      rules: {
        // Normally covered by TypeScript's noImplicitReturns
        "consistent-return": "error",
        // Normally covered by TypeScript ESLint's switch-exhaustiveness-check
        "default-case": "error",
      },
    });
  }
  if (!isBitwiseAllowed) {
    configArray.push({
      rules: {
        "no-bitwise": "error",
      },
    });
  }
  if (!isConsoleAllowed) {
    configArray.push({
      rules: {
        "no-console": ["error", settings.suggestions.noConsole],
      },
    });
  }
  configArray.push(eslintConfigPrettier);
  return configArray;
}

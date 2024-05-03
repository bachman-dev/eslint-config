import { type ConfigOptions, toRulesRecord } from "./types.js";
import { baseRules, handledByTypescript, typescript, typescriptExtensions } from "./rules/index.js";
import type { TSESLint } from "@typescript-eslint/utils";

import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export function config(options: ConfigOptions): TSESLint.FlatConfig.ConfigArray {
  const configArray: TSESLint.FlatConfig.ConfigArray = [eslint.configs.recommended];
  const flatConfig: TSESLint.FlatConfig.Config = {
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  };
  if (options.language === "javascript") {
    flatConfig.rules = toRulesRecord(options, baseRules);
  } else {
    configArray.push(...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked);
    flatConfig.rules = toRulesRecord(options, baseRules, handledByTypescript, typescript, typescriptExtensions);
  }

  configArray.push(flatConfig, eslintConfigPrettier);
  return configArray;
}

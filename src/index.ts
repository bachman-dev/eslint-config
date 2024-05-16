import { type ConfigOptions, toRulesRecord } from "./types.js";
import { baseRules, handledByTypescript, typescript, typescriptExtensions } from "./rules/index.js";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

export default function bachmanDev(options: ConfigOptions): FlatConfig.Config {
  const flatConfig: FlatConfig.Config = {
    name: `@bachman-dev/eslint-config/${options.language}`,
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  };
  if (options.language === "javascript") {
    flatConfig.rules = toRulesRecord(options, baseRules);
  } else {
    flatConfig.rules = toRulesRecord(options, baseRules, handledByTypescript, typescript, typescriptExtensions);
  }
  return flatConfig;
}

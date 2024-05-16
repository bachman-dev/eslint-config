import { type ConfigOptions, toRulesRecord } from "./types.js";
import {
  baseRules,
  handledByTypescript,
  javascriptWithinTypescript,
  typescript,
  typescriptExtensions,
} from "./rules/index.js";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

export default function bachmanDev(options: ConfigOptions): FlatConfig.Config {
  const flatConfig: FlatConfig.Config = {
    name: `@bachman-dev/eslint-config/${options.language}`,
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  };
  switch (options.language) {
    case "javascript":
      flatConfig.rules = toRulesRecord(options, baseRules);
      break;
    case "javascript-in-typescript":
      flatConfig.rules = toRulesRecord(options, baseRules, javascriptWithinTypescript);
      break;
    case "typescript":
      flatConfig.rules = toRulesRecord(options, baseRules, handledByTypescript, typescript, typescriptExtensions);
      break;
  }
  return flatConfig;
}

export type { ConfigOptions };

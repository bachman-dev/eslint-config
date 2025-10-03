import {
  baseRules,
  handledByTypescript,
  javascriptWithinTypescript,
  typescript,
  typescriptExtensions,
} from "./rules/index.js";
import type { ConfigOptions } from "./types.js";
import type { Linter } from "eslint";
import { toRulesRecord } from "./util.js";

export default function bachmanDev(options: ConfigOptions): Linter.Config {
  const flatConfig: Linter.Config = {
    name: `@bachman-dev/eslint-config/${options.language}`,
    linterOptions: {
      reportUnusedDisableDirectives: "error",
      reportUnusedInlineConfigs: "error",
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

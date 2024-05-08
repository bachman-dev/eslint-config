import type { TSESLint } from "@typescript-eslint/utils";

export interface Admonishment {
  text: string;
  type: "caution" | "important" | "note" | "tip" | "warning";
}

export interface ConfigOptions {
  language: "javascript" | "typescript";
  allowBitwise?: boolean;
  allowConsole?: boolean;
  requireParameterProperties?: boolean;
}

export interface RuleMetadata {
  description: string;
  name: string;
  rules: Rule[];
  admonishments?: [Admonishment, ...Admonishment[]];
}

export interface Rule {
  name: string;
  severity: TSESLint.SharedConfig.SeverityString;
  url: string;
  admonishments?: [Admonishment, ...Admonishment[]];
  filteredWhen?: RuleFilter;
  settings?: unknown[] | object | string;
}

export type RuleFilter = (options: ConfigOptions) => boolean;

export function toRulesRecord(options: ConfigOptions, ...groups: RuleMetadata[]): TSESLint.SharedConfig.RulesRecord {
  const rules: TSESLint.SharedConfig.RulesRecord = {};
  groups.forEach((group) => {
    const filteredRules = group.rules.filter((rule) => rule.filteredWhen?.(options) !== true);
    filteredRules.forEach((rule) => {
      if (typeof rule.settings === "undefined") {
        rules[rule.name] = rule.severity;
      } else {
        const ruleLevelAndOptions: TSESLint.SharedConfig.RuleLevelAndOptions = [rule.severity];
        if (Array.isArray(rule.settings)) {
          ruleLevelAndOptions.push(...rule.settings);
        } else {
          ruleLevelAndOptions.push(rule.settings);
        }
        rules[rule.name] = ruleLevelAndOptions;
      }
    });
  });

  return rules;
}

import type { Linter } from "eslint";

export interface Admonishment {
  text: string;
  type: "caution" | "important" | "note" | "tip" | "warning";
}

export interface ConfigOptions {
  language: "javascript-in-typescript" | "javascript" | "typescript";
  allowBitwise?: boolean;
  allowConsole?: boolean;
  namingConvention?: "allow-pascal-case-constants" | "default";
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
  severity: Linter.StringSeverity;
  url: string;
  admonishments?: [Admonishment, ...Admonishment[]];
  filteredWhen?: (options: ConfigOptions) => boolean;
  settings?: unknown[] | object | string;
}

export function toRulesRecord(options: ConfigOptions, ...groups: RuleMetadata[]): Linter.RulesRecord {
  const rules: Linter.RulesRecord = {};
  groups.forEach((group) => {
    const filteredRules = group.rules.filter((rule) => rule.filteredWhen?.(options) !== true);
    filteredRules.forEach((rule) => {
      if (typeof rule.settings === "undefined") {
        rules[rule.name] = rule.severity;
      } else {
        const ruleLevelAndOptions: Linter.RuleSeverityAndOptions = [rule.severity];
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

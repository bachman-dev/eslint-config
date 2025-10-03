import type {
  ConfigOptions,
  NamingConvention,
  NamingConventionModifiers,
  NamingConventionPrimatives,
  NamingConventionSelector,
  RuleMetadata,
} from "./types.js";
import type { Linter } from "eslint";

export function namingConventionSort(itemA: NamingConvention, itemB: NamingConvention): number {
  /* eslint-disable no-bitwise, @typescript-eslint/no-magic-numbers */
  const individualSelectorWeights: Record<
    Exclude<
      NamingConventionSelector,
      "accessor" | "default" | "memberLike" | "method" | "property" | "typeLike" | "variableLike"
    >,
    number
  > = {
    variable: 1 << 0,
    function: 1 << 1,
    parameter: 1 << 2,
    parameterProperty: 1 << 3,
    classicAccessor: 1 << 4,
    enumMember: 1 << 5,
    classMethod: 1 << 6,
    objectLiteralMethod: 1 << 7,
    typeMethod: 1 << 8,
    classProperty: 1 << 9,
    objectLiteralProperty: 1 << 10,
    typeProperty: 1 << 11,
    autoAccessor: 1 << 12,
    class: 1 << 13,
    interface: 1 << 14,
    typeAlias: 1 << 15,
    enum: 1 << 16,
    typeParameter: 1 << 17,
    import: 1 << 18,
  } as const;
  const metaSelectorWeights: Record<
    Extract<
      NamingConventionSelector,
      "accessor" | "default" | "memberLike" | "method" | "property" | "typeLike" | "variableLike"
    >,
    number
  > = {
    default: -1,
    variableLike:
      0 | individualSelectorWeights.variable | individualSelectorWeights.function | individualSelectorWeights.parameter,
    memberLike:
      0 |
      individualSelectorWeights.classProperty |
      individualSelectorWeights.objectLiteralProperty |
      individualSelectorWeights.typeProperty |
      individualSelectorWeights.parameterProperty |
      individualSelectorWeights.enumMember |
      individualSelectorWeights.classMethod |
      individualSelectorWeights.objectLiteralMethod |
      individualSelectorWeights.typeMethod |
      individualSelectorWeights.classicAccessor |
      individualSelectorWeights.autoAccessor,
    typeLike:
      0 |
      individualSelectorWeights.class |
      individualSelectorWeights.interface |
      individualSelectorWeights.typeAlias |
      individualSelectorWeights.enum |
      individualSelectorWeights.typeParameter,
    method:
      0 |
      individualSelectorWeights.classMethod |
      individualSelectorWeights.objectLiteralMethod |
      individualSelectorWeights.typeMethod,
    property:
      0 |
      individualSelectorWeights.classProperty |
      individualSelectorWeights.objectLiteralProperty |
      individualSelectorWeights.typeProperty,
    accessor: 0 | individualSelectorWeights.classicAccessor | individualSelectorWeights.autoAccessor,
  } as const;

  const modifierWeights: Record<keyof NamingConventionModifiers, number> = {
    const: 1 << 0,
    readonly: 1 << 1,
    static: 1 << 2,
    public: 1 << 3,
    protected: 1 << 4,
    private: 1 << 5,
    "#private": 1 << 6,
    abstract: 1 << 7,
    destructured: 1 << 8,
    global: 1 << 9,
    exported: 1 << 10,
    unused: 1 << 11,
    requiresQuotes: 1 << 12,
    override: 1 << 13,
    async: 1 << 14,
    default: 1 << 15,
    namespace: 1 << 16,
  } as const;

  const typeWeights: Record<NamingConventionPrimatives, number> = {
    boolean: 1 << 17,
    string: 1 << 18,
    number: 1 << 19,
    function: 1 << 20,
    array: 1 << 21,
  } as const;
  /* eslint-enable no-bitwise, @typescript-eslint/no-magic-numbers */

  const selectorWeightA =
    itemA.selector === "accessor" ||
    itemA.selector === "default" ||
    itemA.selector === "memberLike" ||
    itemA.selector === "method" ||
    itemA.selector === "property" ||
    itemA.selector === "typeLike" ||
    itemA.selector === "variableLike"
      ? metaSelectorWeights[itemA.selector]
      : individualSelectorWeights[itemA.selector];

  const selectorWeightB =
    itemB.selector === "accessor" ||
    itemB.selector === "default" ||
    itemB.selector === "memberLike" ||
    itemB.selector === "method" ||
    itemB.selector === "property" ||
    itemB.selector === "typeLike" ||
    itemB.selector === "variableLike"
      ? metaSelectorWeights[itemB.selector]
      : individualSelectorWeights[itemB.selector];

  if (selectorWeightA === selectorWeightB) {
    let modifierWeightA = 0;
    let modifierWeightB = 0;
    itemA.modifiers?.forEach((modifier) => {
      // eslint-disable-next-line no-bitwise -- Bitwise OR accumulation
      modifierWeightA |= modifierWeights[modifier];
    });
    itemA.types?.forEach((type) => {
      // eslint-disable-next-line no-bitwise -- Bitwise OR accumulation
      modifierWeightA |= typeWeights[type];
    });
    itemB.modifiers?.forEach((modifier) => {
      // eslint-disable-next-line no-bitwise -- Bitwise OR accumulation
      modifierWeightB |= modifierWeights[modifier];
    });
    itemB.types?.forEach((type) => {
      // eslint-disable-next-line no-bitwise -- Bitwise OR accumulation
      modifierWeightB |= typeWeights[type];
    });

    return modifierWeightB - modifierWeightA;
  }

  const isMetaA =
    itemA.selector === "accessor" ||
    itemA.selector === "default" ||
    itemA.selector === "memberLike" ||
    itemA.selector === "method" ||
    itemA.selector === "property" ||
    itemA.selector === "typeLike" ||
    itemA.selector === "variableLike";

  const isMetaB =
    itemB.selector === "accessor" ||
    itemB.selector === "default" ||
    itemB.selector === "memberLike" ||
    itemB.selector === "method" ||
    itemB.selector === "property" ||
    itemB.selector === "typeLike" ||
    itemB.selector === "variableLike";

  if (isMetaA && !isMetaB) {
    return 1;
  }
  if (!isMetaA && isMetaB) {
    return -1;
  }

  const isMethodOrPropertyA = itemA.selector === "method" || itemA.selector === "property";
  const isMethodOrPropertyB = itemB.selector === "method" || itemB.selector === "property";

  if (isMethodOrPropertyA && !isMethodOrPropertyB) {
    return -1;
  }
  if (!isMethodOrPropertyA && isMethodOrPropertyB) {
    return 1;
  }

  return selectorWeightB - selectorWeightA;
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

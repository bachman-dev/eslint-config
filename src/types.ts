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

export type NamingConventionSelector =
  | "accessor"
  | "autoAccessor"
  | "class"
  | "classicAccessor"
  | "classMethod"
  | "classProperty"
  | "default"
  | "enum"
  | "enumMember"
  | "function"
  | "import"
  | "interface"
  | "memberLike"
  | "method"
  | "objectLiteralMethod"
  | "objectLiteralProperty"
  | "parameter"
  | "parameterProperty"
  | "property"
  | "typeAlias"
  | "typeLike"
  | "typeMethod"
  | "typeParameter"
  | "typeProperty"
  | "variable"
  | "variableLike";

export interface NamingConventionModifiers {
  "#private": "#private";
  abstract: "abstract";
  async: "async";
  const: "const";
  default: "default";
  destructured: "destructured";
  exported: "exported";
  global: "global";
  namespace: "namespace";
  override: "override";
  private: "private";
  protected: "protected";
  public: "public";
  readonly: "readonly";
  requiresQuotes: "requiresQuotes";
  static: "static";
  unused: "unused";
}

interface NamingConventionSelectorModifiers {
  accessor: NamingConventionModifiers[
    | "abstract"
    | "override"
    | "private"
    | "protected"
    | "public"
    | "requiresQuotes"
    | "static"];
  autoAccessor: NamingConventionModifiers[
    | "abstract"
    | "override"
    | "private"
    | "protected"
    | "public"
    | "requiresQuotes"
    | "static"];
  class: "abstract" | "exported" | "unused";
  classMethod: NamingConventionModifiers[
    | "#private"
    | "abstract"
    | "async"
    | "override"
    | "private"
    | "protected"
    | "public"
    | "requiresQuotes"
    | "static"];
  classProperty: NamingConventionModifiers[
    | "#private"
    | "abstract"
    | "override"
    | "private"
    | "protected"
    | "public"
    | "readonly"
    | "requiresQuotes"
    | "static"];
  classicAccessor: NamingConventionModifiers[
    | "abstract"
    | "override"
    | "private"
    | "protected"
    | "public"
    | "requiresQuotes"
    | "static"];
  default: keyof NamingConventionModifiers;
  enum: NamingConventionModifiers["exported" | "unused"];
  enumMember: NamingConventionModifiers["requiresQuotes"];
  function: NamingConventionModifiers["async" | "exported" | "global" | "unused"];
  import: NamingConventionModifiers["default" | "namespace"];
  interface: NamingConventionModifiers["exported" | "unused"];
  memberLike: NamingConventionModifiers[
    | "#private"
    | "abstract"
    | "async"
    | "override"
    | "private"
    | "protected"
    | "public"
    | "readonly"
    | "requiresQuotes"
    | "static"];
  method: NamingConventionModifiers[
    | "#private"
    | "abstract"
    | "async"
    | "override"
    | "private"
    | "protected"
    | "public"
    | "readonly"
    | "requiresQuotes"
    | "static"];
  objectLiteralMethod: NamingConventionModifiers["async" | "public" | "requiresQuotes"];
  objectLiteralProperty: NamingConventionModifiers["public" | "requiresQuotes"];
  parameter: NamingConventionModifiers["destructured" | "unused"];
  parameterProperty: NamingConventionModifiers["private" | "protected" | "public" | "readonly"];
  property: NamingConventionModifiers[
    | "#private"
    | "abstract"
    | "async"
    | "override"
    | "private"
    | "protected"
    | "public"
    | "readonly"
    | "requiresQuotes"
    | "static"];
  typeAlias: NamingConventionModifiers["exported" | "unused"];
  typeLike: NamingConventionModifiers["abstract" | "unused"];
  typeMethod: NamingConventionModifiers["public" | "requiresQuotes"];
  typeParameter: NamingConventionModifiers["unused"];
  typeProperty: NamingConventionModifiers["public" | "readonly" | "requiresQuotes"];
  variable: NamingConventionModifiers["async" | "const" | "destructured" | "exported" | "global" | "unused"];
  variableLike: NamingConventionModifiers["async" | "unused"];
}

export type NamingConventionPrimatives = "array" | "boolean" | "function" | "number" | "string";

type NamingConventionType<S extends NamingConventionSelector> = S extends
  | "accessor"
  | "autoAccessor"
  | "classicAccessor"
  | "classProperty"
  | "objectLiteralProperty"
  | "parameter"
  | "parameterProperty"
  | "property"
  | "typeProperty"
  | "variable"
  ? NamingConventionPrimatives
  : never;

export type NamingConvention = {
  [S in NamingConventionSelector]: {
    selector: S;
    modifiers?: NamingConventionSelectorModifiers[S][];
    types?: NamingConventionType<S>[];
  };
}[NamingConventionSelector] & {
  format: ("camelCase" | "PascalCase" | "snake_case" | "strictCamelCase" | "StrictPascalCase" | "UPPER_CASE")[] | null;
  custom?: {
    match: boolean;
    regex: string;
  };
  filter?:
    | string
    | {
        match: boolean;
        regex: string;
      };
  leadingUnderscore?: "allow" | "allowDouble" | "allowSingleOrDouble" | "forbid" | "require" | "requireDouble";
  prefix?: string[];
  suffix?: string[];
  trailingUnderscore?: "allow" | "allowDouble" | "allowSingleOrDouble" | "forbid" | "require" | "requireDouble";
};

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

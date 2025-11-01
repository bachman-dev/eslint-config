import type { NamingConvention } from "../../types.js";

const lowercaseIndicativePrefixes = [
  "are",
  "can",
  "could",
  "did",
  "does",
  "had",
  "has",
  "have",
  "is",
  "may",
  "might",
  "shall",
  "should",
  "was",
  "were",
  "will",
];

const uppercaseIndicativePrefixes = [
  "ARE_",
  "CAN_",
  "COULD_",
  "DID_",
  "DOES_",
  "HAD_",
  "HAS_",
  "HAVE",
  "IS_",
  "MAY_",
  "MIGHT_",
  "SHALL_",
  "SHOULD_",
  "WAS_",
  "WERE_",
  "WILL_",
];

export const upperAndLowercaseIndicativePrefixes = [...lowercaseIndicativePrefixes, ...uppercaseIndicativePrefixes];

export const baseNamingConvention: NamingConvention[] = [
  {
    // PascalCase for classes, interfaces, enums, and type aliases/parameters
    selector: "typeLike",
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["PascalCase"],
  },
  {
    // PascalCase for enum members
    selector: "enumMember",
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["PascalCase"],
  },
  {
    // If something is private and readonly, prefix it with an underscore and allow UPPER_CASE
    selector: "memberLike",
    modifiers: ["private", "readonly"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    format: ["camelCase", "UPPER_CASE"],
  },
  {
    // No need for an underscore for built-in private readonly elements
    selector: "memberLike",
    modifiers: ["#private", "readonly"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["camelCase", "UPPER_CASE"],
  },
  {
    // No need for an underscore for built-in private elements
    selector: "memberLike",
    modifiers: ["#private"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["camelCase"],
  },
  {
    // If something is just private, prefix it with an underscore
    selector: "memberLike",
    modifiers: ["private"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    format: ["camelCase"],
  },
  {
    // Readonly members can be UPPER_CASE
    selector: "memberLike",
    modifiers: ["readonly"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["camelCase", "UPPER_CASE"],
  },
  {
    // Any private boolean accessors should start with an underscore and indicative word for truth/falsehood
    selector: "accessor",
    modifiers: ["private"],
    types: ["boolean"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    prefix: lowercaseIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase
    format: ["PascalCase"],
  },
  {
    // Any boolean accessors should start with an underscore and indicative word for truth/falsehood
    selector: "accessor",
    types: ["boolean"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    prefix: lowercaseIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase
    format: ["PascalCase"],
  },
  {
    // Any private readonly boolean class properties should start with an underscore and indicative word for truth/falsehood
    selector: "classProperty",
    modifiers: ["private", "readonly"],
    types: ["boolean"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    prefix: upperAndLowercaseIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase or UPPER_CASE
    format: ["PascalCase", "UPPER_CASE"],
  },
  {
    // Any #private readonly boolean class properties should not start with an underscore and indicative word for truth/falsehood
    selector: "classProperty",
    modifiers: ["#private", "readonly"],
    types: ["boolean"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    prefix: upperAndLowercaseIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase or UPPER_CASE
    format: ["PascalCase", "UPPER_CASE"],
  },
  {
    // Any private boolean class properties should start with an underscore and indicative word for truth/falsehood
    selector: "classProperty",
    modifiers: ["private"],
    types: ["boolean"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    prefix: lowercaseIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase
    format: ["PascalCase"],
  },
  {
    // Any #private boolean class properties should start with an underscore and indicative word for truth/falsehood
    selector: "classProperty",
    modifiers: ["#private"],
    types: ["boolean"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    prefix: lowercaseIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase
    format: ["PascalCase"],
  },
  {
    // Any #private boolean class properties should start with an underscore and indicative word for truth/falsehood
    selector: "classProperty",
    modifiers: ["readonly"],
    types: ["boolean"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    prefix: upperAndLowercaseIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase
    format: ["PascalCase", "UPPER_CASE"],
  },
  {
    // Any boolean class properties should start with an underscore and indicative word for truth/falsehood
    selector: "classProperty",
    types: ["boolean"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    prefix: lowercaseIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase
    format: ["PascalCase"],
  },
  {
    // Any private readonly boolean parameter properties should start with an underscore and indicative word for truth/falsehood
    selector: "parameterProperty",
    modifiers: ["private", "readonly"],
    types: ["boolean"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    prefix: upperAndLowercaseIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase or UPPER_CASE
    format: ["PascalCase", "UPPER_CASE"],
  },
  {
    // Any private boolean parameter properties should start with an underscore and indicative word for truth/falsehood
    selector: "parameterProperty",
    modifiers: ["private"],
    types: ["boolean"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    prefix: lowercaseIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase
    format: ["PascalCase"],
  },
  {
    // Any readonly boolean parameter properties should start with an underscore and indicative word for truth/falsehood
    selector: "parameterProperty",
    modifiers: ["readonly"],
    types: ["boolean"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    prefix: upperAndLowercaseIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase
    format: ["PascalCase", "UPPER_CASE"],
  },
  {
    // Any boolean parameter properties should start with an underscore and indicative word for truth/falsehood
    selector: "parameterProperty",
    types: ["boolean"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    prefix: lowercaseIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase
    format: ["PascalCase"],
  },
  {
    // Relaxed format for object properties, as they tend to reflect external APIs.
    selector: "objectLiteralProperty",
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["camelCase", "snake_case", "PascalCase", "UPPER_CASE"],
  },
  {
    /* And if their property names need quotes, only forbid starting/ending underscores, cause we likely can't stick
       to a format if we need quotes. */
    selector: "objectLiteralProperty",
    modifiers: ["requiresQuotes"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: null,
  },
  {
    // Relaxed format for type properties, as they tend to reflect external APIs.
    selector: "typeProperty",
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["camelCase", "snake_case", "PascalCase", "UPPER_CASE"],
  },
  {
    /* And if their property names need quotes, only forbid starting/ending underscores, cause we likely can't stick
       to a format if we need quotes. */
    selector: "typeProperty",
    modifiers: ["requiresQuotes"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: null,
  },
  {
    // Any unused boolean parameters should start with an underscore and indicative word
    selector: "parameter",
    modifiers: ["unused"],
    types: ["boolean"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    prefix: lowercaseIndicativePrefixes,
    //  Leading underscore, then prefix, are trimmed when checking, so remainder should end up as PascalCase
    format: ["PascalCase"],
  },
  {
    // Require an underscore at the start of unused parameters
    selector: "parameter",
    modifiers: ["unused"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    format: ["camelCase"],
  },
  {
    // Any used boolean parameters should start with an indicative word for truth/falsehood
    selector: "parameter",
    types: ["boolean"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    prefix: lowercaseIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase
    format: ["PascalCase"],
  },
  {
    // Any unused booleans variable start with an indicative word for truth/falsehood
    selector: "variable",
    modifiers: ["unused"],
    types: ["boolean"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    prefix: lowercaseIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase
    format: ["PascalCase"],
  },
  {
    // Require an underscore at the start of unused variables
    selector: "variable",
    modifiers: ["unused"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    format: ["camelCase"],
  },
  {
    // Any used booleans variable start with an indicative word for truth/falsehood
    selector: "variable",
    types: ["boolean"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    prefix: lowercaseIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase
    format: ["PascalCase"],
  },
  {
    // Allow functions to be either camelCase or PascalCase (i.e. for React components)
    selector: "function",
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["camelCase", "PascalCase"],
  },
  {
    // Relaxed for imports
    selector: "import",
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["camelCase", "snake_case", "PascalCase", "UPPER_CASE"],
  },
  {
    // A good catch-all for everything else
    selector: "default",
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["camelCase"],
  },
];

export const defaultConstCases: NamingConvention[] = [
  {
    // Unused boolean constants need an underscore at the beginning
    selector: "variable",
    modifiers: ["const", "unused"],
    types: ["boolean"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    prefix: upperAndLowercaseIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase or UPPER_CASE
    format: ["PascalCase", "UPPER_CASE"],
  },
  {
    // Allow boolean constants to be uppercase
    selector: "variable",
    modifiers: ["const"],
    types: ["boolean"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    prefix: upperAndLowercaseIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase or UPPER_CASE
    format: ["PascalCase", "UPPER_CASE"],
  },
  {
    // Unused constants need an underscore at the beginning
    selector: "variable",
    modifiers: ["const", "unused"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    format: ["camelCase", "UPPER_CASE"],
  },
  {
    // Constants can also be uppercase
    selector: "variable",
    modifiers: ["const"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["camelCase", "UPPER_CASE"],
  },
];

const defaultNamingConvention: NamingConvention[] = [...baseNamingConvention, ...defaultConstCases];

export default defaultNamingConvention;

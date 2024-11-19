const lowercaseIndicativePrefixes = [
  "are",
  "can",
  "could",
  "did",
  "does",
  "has",
  "have",
  "is",
  "may",
  "might",
  "shall",
  "should",
  "was",
  "were",
] as const;

const uppercaseIndicativePrefixes = [
  "ARE_",
  "CAN_",
  "COULD_",
  "DID_",
  "DOES_",
  "HAS_",
  "HAVE",
  "IS_",
  "MAY_",
  "MIGHT_",
  "SHALL_",
  "SHOULD_",
  "WAS_",
  "WERE_",
] as const;

const anyIndicativePrefixes = [...lowercaseIndicativePrefixes, ...uppercaseIndicativePrefixes];

const namingConvention = [
  {
    // Any readonly boolean class/parameter properties should start with an indicative word for truth/falsehood
    selector: ["classProperty", "parameterProperty"],
    types: ["boolean"],
    modifiers: ["readonly"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    prefix: anyIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase or UPPER_CASE
    format: ["PascalCase", "UPPER_CASE"],
  },
  {
    // Any private readonly boolean class/parameter properties should start with an underscore and indicative word for truth/falsehood
    selector: ["classProperty", "parameterProperty"],
    types: ["boolean"],
    modifiers: ["readonly", "private"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    prefix: anyIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase or UPPER_CASE
    format: ["PascalCase", "UPPER_CASE"],
  },
  {
    // Any used booleans should start with an indicative word for truth/falsehood
    selector: ["accessor", "classProperty", "parameter", "parameterProperty", "variable"],
    types: ["boolean"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    prefix: lowercaseIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase
    format: ["PascalCase"],
  },
  {
    // Any unused boolean accessors, parameters, and class/parameter properties should start with an underscore and indicative word
    selector: ["accessor", "classProperty", "parameter", "parameterProperty"],
    types: ["boolean"],
    modifiers: ["unused"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    prefix: lowercaseIndicativePrefixes,
    //  Leading underscore, then prefix, are trimmed when checking, so remainder should end up as PascalCase
    format: ["PascalCase"],
  },
  {
    // PascalCase for classes, interfaces, enums, and type aliases/parameters
    selector: ["class", "enum", "enumMember", "interface", "typeAlias", "typeParameter"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["PascalCase"],
  },
  {
    // If something is private and readonly, prefix it with an underscore and allow UPPER_CASE
    selector: ["classProperty", "parameterProperty"],
    modifiers: ["private", "readonly"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    format: ["camelCase", "UPPER_CASE"],
  },
  {
    // If something is just private, prefix it with an underscore
    selector: ["accessor", "classMethod", "classProperty", "parameterProperty"],
    modifiers: ["private"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    format: ["camelCase"],
  },
  {
    // Readonly #private items can also be UPPER_CASE
    selector: ["classMethod", "classProperty"],
    modifiers: ["#private", "readonly"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["camelCase", "UPPER_CASE"],
  },
  {
    // No need for an underscore for built-in privates
    selector: ["classMethod", "classProperty"],
    modifiers: ["#private"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["camelCase"],
  },
  {
    // Readonly items can be UPPER_CASE
    selector: ["classProperty", "parameterProperty"],
    modifiers: ["readonly"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["camelCase", "UPPER_CASE"],
  },
  {
    // Relaxed format for properties, as they tend to reflect external APIs.
    selector: ["objectLiteralProperty", "typeProperty"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["camelCase", "snake_case", "PascalCase", "UPPER_CASE"],
  },
  {
    /* And if their property names need quotes, only forbid starting/ending underscores, cause we likely can't stick
        to a format if we need quotes. */
    selector: ["objectLiteralProperty", "typeProperty"],
    modifiers: ["requiresQuotes"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: null,
  },
  {
    // Require an underscore at the start of unused variables
    selector: ["parameter", "variable"],
    modifiers: ["unused"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    format: ["camelCase"],
  },
  {
    // Allow functions to be either camelCase or PascalCase (i.e. for React components)
    selector: ["function"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["camelCase", "PascalCase"],
  },
  {
    // Allow boolean constants to be uppercase
    selector: ["variable"],
    modifiers: ["const"],
    types: ["boolean"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    prefix: anyIndicativePrefixes,
    format: ["camelCase", "UPPER_CASE"],
  },
  {
    // Unused boolean constants need an underscore at the beginning
    selector: ["variable"],
    modifiers: ["const", "unused"],
    types: ["boolean"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    prefix: anyIndicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase or UPPER_CASE
    format: ["PascalCase", "UPPER_CASE"],
  },
  {
    // Unused constants need an underscore at the beginning
    selector: ["variable"],
    modifiers: ["const", "unused"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    format: ["camelCase", "UPPER_CASE"],
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

export default namingConvention;

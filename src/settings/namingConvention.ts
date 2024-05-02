const indicativePrefixes = [
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
];

const namingConvention = [
  {
    // Any used booleans should start with an indicative word for truth/falsehood
    selector: ["accessor", "classProperty", "parameter", "parameterProperty", "variable"],
    types: ["boolean"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    prefix: indicativePrefixes,
    // Prefix is trimmed when checking, so remainder should end up as PascalCase
    format: ["PascalCase"],
  },
  {
    // Any unused booleans should start with an underscore, followed by the indicative word just like above
    selector: ["accessor", "classProperty", "parameter", "parameterProperty", "variable"],
    types: ["boolean"],
    modifiers: ["unused"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    prefix: indicativePrefixes,
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
    // If something is private, prefix it with an underscore ( _ )
    selector: ["accessor", "classMethod", "classProperty", "parameterProperty"],
    modifiers: ["private"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    format: ["camelCase"],
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
    // Allow constants to be uppercase
    selector: ["variable"],
    modifiers: ["const"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["camelCase", "UPPER_CASE"],
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

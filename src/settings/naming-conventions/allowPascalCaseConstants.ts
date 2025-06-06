import { baseNamingConvention, upperAndLowercaseIndicativePrefixes } from "./default.js";

const pascalCaseIndicativePrefixes = [
  "Are",
  "Can",
  "Could",
  "Did",
  "Does",
  "Has",
  "Have",
  "Is",
  "May",
  "Might",
  "Shall",
  "Should",
  "Was",
  "Were",
] as const;

const namingConvention = [
  ...baseNamingConvention,
  {
    // Allow boolean constants to be uppercase
    selector: ["variable"],
    modifiers: ["const"],
    types: ["boolean"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    prefix: [...upperAndLowercaseIndicativePrefixes, ...pascalCaseIndicativePrefixes],
    // Prefix is trimmed when checking, so remainder should end up as PascalCase or UPPER_CASE
    format: ["PascalCase", "UPPER_CASE"],
  },
  {
    // Unused boolean constants need an underscore at the beginning
    selector: ["variable"],
    modifiers: ["const", "unused"],
    types: ["boolean"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    prefix: [...upperAndLowercaseIndicativePrefixes, ...pascalCaseIndicativePrefixes],
    // Prefix is trimmed when checking, so remainder should end up as PascalCase or UPPER_CASE
    format: ["PascalCase", "UPPER_CASE"],
  },
  {
    // Unused constants need an underscore at the beginning
    selector: ["variable"],
    modifiers: ["const", "unused"],
    leadingUnderscore: "require",
    trailingUnderscore: "forbid",
    format: ["PascalCase", "camelCase", "UPPER_CASE"],
  },
  {
    // Constants can also be uppercase or PascalCase
    selector: ["variable"],
    modifiers: ["const"],
    leadingUnderscore: "forbid",
    trailingUnderscore: "forbid",
    format: ["PascalCase", "camelCase", "UPPER_CASE"],
  },
];

export default namingConvention;

import memberOrdering from "./memberOrdering.js";
import namingConvention from "./namingConvention.js";
import noRestrictedSyntax from "./noRestrictedSyntax.js";

export const jsMaxParams = { max: 4 };

export const tsMaxParams = { ...jsMaxParams };

export const jsNoMagicNumbers = {
  ignoreArrayIndexes: true,
  ignoreDefaultValues: true,
  ignore: [-1, 0, 1, "-1n", "0n", "1n"],
};

export const tsNoMagicNumbers = {
  ...jsNoMagicNumbers,
  ignoreEnums: true,
  ignoreNumericLiteralTypes: true,
  ignoreReadonlyClassProperties: true,
  ignoreTypeIndexes: true,
};

export const jsNoShadow = {
  builtinGlobals: true,
  ignoreOnInitialization: true,
};

export const tsNoShadow = {
  ...jsNoShadow,
};

export const jsNoUnusedExpressions = {
  enforceForJSX: true,
};

export const tsNoUnusedExpressions = {
  ...jsNoUnusedExpressions,
};

export const jsNoUnusedVars = {
  vars: "all",
  args: "after-used",
  caughtErrors: "all",
  ignoreRestSiblings: false,
  argsIgnorePattern: "^_",
  caughtErrorsIgnorePattern: "^_",
  destructuredArrayIgnorePattern: "^_",
  reportUsedIgnorePattern: true,
  varsIgnorePattern: "^_",
};

export const tsNoUnusedVars = {
  ...jsNoUnusedVars,
};

export const jsNoUseBeforeDefine = {
  functions: false,
  classes: true,
  variables: true,
  allowNamedExports: true,
};

export const tsNoUseBeforeDefine = {
  ...jsNoUseBeforeDefine,
  enums: true,
  typedefs: true,
  ignoreTypeReferences: true,
};

export const jsPreferDestructuring = { object: true, array: false };

export const tsPreferDestructuring = {
  ...jsPreferDestructuring,
};

const settings = {
  possibleProblems: {
    noUnusedVars: jsNoUnusedVars,
    noUseBeforeDefine: jsNoUseBeforeDefine,
  },
  suggestions: {
    arrowBodyStyle: ["as-needed", { requireReturnForObjectLiteral: true }],
    capitalizedComments: ["always", { ignoreConsecutiveComments: true }],
    funcStyle: ["declaration", { allowArrowFunctions: true }],
    groupedAccessorPairs: "getBeforeSet",
    idLength: { min: 3, exceptions: ["t"], properties: "never" },
    maxLines: 10_000,
    maxLinesPerFunction: 1000,
    maxParams: { max: 4 },
    newCap: { newIsCapExceptions: ["ctor"] },
    noConsole: { allow: ["info", "warn", "error"] },
    noImplicitGlobals: { lexicalBindings: true },
    noLabels: { allowLoop: true },
    noMagicNumbers: jsNoMagicNumbers,
    noPlusPlus: { allowForLoopAfterthoughts: true },
    noRestrictedSyntax,
    noReturnAssign: "always",
    noShadow: jsNoShadow,
    noWarningComments: { terms: ["fixme"] },
    oneVar: "never",
    operatorAssignment: "always",
    preferDestructuring: jsPreferDestructuring,
  },
  formatting: {
    lineCommentPosition: {
      ignorePattern: "WHY:",
    },
  },
  typescript: {
    consistentTypeExports: {
      fixMixedExportsWithInlineTypeSpecifier: true,
    },
    consistentTypeImports: {
      prefer: "type-imports",
      disallowTypeAnnotations: true,
      fixStyle: "inline-type-imports",
    },
    memberOrdering,
    namingConvention,
    noMagicNumbers: {
      ...jsNoMagicNumbers,
      ignoreEnums: true,
      ignoreNumericLiteralTypes: true,
      ignoreReadonlyClassProperties: true,
      ignoreTypeIndexes: true,
    },
    noShadow: {
      ...jsNoShadow,
    },
    noUnusedVars: jsNoUnusedVars,
    noUseBeforeDefine: {
      ...jsNoUseBeforeDefine,
      enums: true,
      typedefs: true,
      ignoreTypeReferences: true,
    },
    preferDestructuring: {
      ...jsPreferDestructuring,
    },
    returnAwait: "always",
    switchExhaustivenessCheck: {
      allowDefaultCaseForExhaustiveSwitch: true,
      requireDefaultForNonUnion: true,
    },
  },
};

export default settings;

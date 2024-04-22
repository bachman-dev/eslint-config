import memberOrdering from "./memberOrdering.js";
import namingConvention from "./namingConvention.js";
import noRestrictedSyntax from "./noRestrictedSyntax.js";

const noMagicNumbers = {
  ignoreArrayIndexes: true,
  ignoreDefaultValues: true,
  ignore: [-1, 0, 1, "-1n", "0n", "1n"],
};

const noShadow = {
  builtinGlobals: true,
  ignoreOnInitialization: true,
};

const noUnusedVars = {
  vars: "all",
  args: "after-used",
  caughtErrors: "all",
  ignoreRestSiblings: false,
  argsIgnorePattern: "^_",
  caughtErrorsIgnorePattern: "^_",
  destructuredArrayIgnorePattern: "^_",
  // TODO: ESLint 9.0 support -- reportUsedIgnorePattern: true,
  varsIgnorePattern: "^_",
};

const noUseBeforeDefine = {
  functions: false,
  classes: true,
  variables: true,
  allowNamedExports: true,
};

const preferDestructuring = { object: true, array: false };

const settings = {
  possibleProblems: {
    noUnusedVars,
    noUseBeforeDefine,
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
    noMagicNumbers,
    noPlusPlus: { allowForLoopAfterthoughts: true },
    noRestrictedSyntax,
    noReturnAssign: "always",
    noShadow,
    noWarningComments: { terms: ["fixme"] },
    oneVar: "never",
    operatorAssignment: "always",
    preferDestructuring,
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
      ...noMagicNumbers,
      ignoreEnums: true,
      ignoreNumericLiteralTypes: true,
      ignoreReadonlyClassProperties: true,
      ignoreTypeIndexes: true,
    },
    noShadow: {
      ...noShadow,
    },
    noUnusedVars,
    noUseBeforeDefine: {
      ...noUseBeforeDefine,
      enums: true,
      typedefs: true,
      ignoreTypeReferences: true,
    },
    preferDestructuring: {
      ...preferDestructuring,
    },
    returnAwait: "always",
    switchExhaustivenessCheck: {
      allowDefaultCaseForExhaustiveSwitch: true,
      requireDefaultForNonUnion: true,
    },
  },
};

export default settings;

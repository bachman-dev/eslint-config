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

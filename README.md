# @bachman-dev/eslint-config

This is an [ESLint Shared Configuration](https://eslint.org/docs/latest/extend/shareable-configs) for use in all Bachman Dev projects. It contains highly opinionated rules from ESLint and typescript-eslint to help conform to our coding style.

> [!WARNING]  
> This configuration is in an early stage of development. Use at your own risk!

## Should I Use This?

In terms of using this config as-is, unless you're contributing code that's under the `@bachman-dev` Organization... probably not. However, use of the source code to make your own shareable ESLint config is encouraged, especially if its structure could be of some help to others.

## Installation

### TypeScript (and Maybe Some JavaScript e.g. Config Files)

Install the following packages:

```shell
pnpm add --save-dev typescript eslint @eslint/js typescript-eslint eslint-config-prettier @bachman-dev/eslint-config
```

Add the following to your `eslint.config.js`:

```javascript
import bachmanDev from "@bachman-dev/eslint-config";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    // Replace output folder if needed, e.g. "dist"
    ignores: ["dist/**"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  bachmanDev({ language: "typescript" }),
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ["**/*.js"],
    ...bachmanDev({ language: "javascript-in-typescript" }),
  },
  eslintConfigPrettier,
);
```

### Plain JavaScript

Install the following packages:

```shell
pnpm add --save-dev eslint @eslint/js eslint-config-prettier @bachman-dev/eslint-config
```

```javascript
import bachmanDev from "@bachman-dev/eslint-config";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    // Replace output folder if needed, e.g. "dist"
    ignores: ["dist/**"],
  },
  eslint.configs.recommended,
  bachmanDev({ language: "javascript" }),
  eslintConfigPrettier,
];
```

## Rulesets

The following rulesets are applied to your ESLint configuration depending on language:

- All Languages: [Base (JS/TS) Rules](/src/rules/README.md#base-jsts-rules)
- `typescript`: [Handled by TypeScript](/src/rules/README.md#handled-by-typescript), [TypeScript Rules](/src/rules/README.md#typescript-rules), [ESLint Extensions by typescript-eslint](/src/rules/README.md#eslint-extensions-by-typescript-eslint)
- `javascript-in-typescript`: [JavaScript within TypeScript](/src/rules/README.md#javascript-within-typescript)

## Configuration

The rules enabled by this configuration are highly opinionated, but some exceptions are made for niche projects.

### `language`

Typically either set to `javascript` or `typescript` when configuring across all files. For projects with a mixture of JavaScript and TypeScript, you should include the config with the `language` set to `javascript-in-typescript`, with a `files` property on the config object limited to only JavaScript files. See the above Installation instructions for an example.

### `allowBitwise`

When set to `true`, we allow Bitwise Operators such as `&`, `|`, `<<`, `>>`, etc. These normally indicate a typo, but some programs such as Discord bots rely on them heavily. So this option can be enabled instead of disabling the rule per line many times.

### `allowConsole`

Permits plain calls to `console` methods when set to `true`.

> [!WARNING]
> Logging via the built-in "console" object can be convenient, but usually leads to excess outputs hanging around; it's best to use a logging framework (or make your own service, disabling this rule in your own methods) so that logging is centralized, configurable, and not (as often) subject to misplaced log-prints that make it into production. Consider this before enabling this config option.

### `requireParameterProperties`

Older TypeScript projects didn't take advantage of [Parameter Properties](https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties), so as a **temporary** means, this option can be set to `false` to soften the blow when it comes to linting errors when enabling this config.

> [!TIP]
> Updating the code to adhere to this rule should be done sooner than later if this option is set to `false`.

## Contributing

Generally speaking, this project doesn't accept outside contributions with a couple of exceptions:

1. Security Vulnerability Reports -- see [SECURITY.md](/SECURITY.md)
2. Pull Requests opened against [existing open Issues accepting Pull Requests](https://github.com/bachman-dev/eslint-config/issues?q=is%3Aopen+is%3Aissue+label%3A%22accepting+prs%22)

Thank you for your understanding!

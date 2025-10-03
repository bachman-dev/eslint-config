import type {
  Admonishment,
  NamingConvention,
  NamingConventionModifiers,
  NamingConventionSelector,
} from "../src/types.js";
import { baseNamingConvention, defaultConstCases } from "../src/settings/naming-conventions/default.js";
import {
  baseRules,
  handledByTypescript,
  javascriptWithinTypescript,
  typescript,
  typescriptExtensions,
} from "../src/rules/index.js";

import { join } from "path";
import { namingConventionSort } from "../src/util.js";
import { pascalCaseConstants } from "../src/settings/naming-conventions/allow-pascal-case-constants.js";
import { writeFile } from "fs/promises";

function admonish(admonishments: Admonishment[] | undefined): string {
  let admonishmentString = "";
  admonishments?.forEach((admonishment) => {
    admonishmentString += "> [!";
    switch (admonishment.type) {
      case "caution":
        admonishmentString += "CAUTION";
        break;
      case "important":
        admonishmentString += "IMPORTANT";
        break;
      case "note":
        admonishmentString += "NOTE";
        break;
      case "tip":
        admonishmentString += "TIP";
        break;
      case "warning":
        admonishmentString += "WARNING";
    }
    admonishmentString += `]\n> ${admonishment.text}\n\n`;
  });
  return admonishmentString;
}

const heading = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
} as const;

type Heading = (typeof heading)[keyof typeof heading];

function header(level: Heading, text: string): string {
  return `${"#".repeat(level)} ${text}\n\n`;
}

function json(item: unknown): string {
  return `\`\`\`json\n${JSON.stringify(item)}\n\`\`\`\n\n`;
}

function link(text: string, href: string): string {
  return `[${text}](${href})`;
}

function list(items: string[]): string {
  let listString = "";
  items.forEach((item) => {
    listString += `- ${item}\n`;
  });
  return listString;
}

function capitalize(words: string): string {
  if (!words) {
    return "";
  }
  const HIGH_UNICODE_CODE_POINT = 0xffff;
  const INDEX_02 = 2;
  const firstCodePoint = words.codePointAt(0);
  if (typeof firstCodePoint !== "undefined") {
    const index = firstCodePoint > HIGH_UNICODE_CODE_POINT ? INDEX_02 : 1;
    return String.fromCodePoint(firstCodePoint).toUpperCase() + words.slice(index);
  }
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function paragraph(text: string): string {
  return `${text}\n\n`;
}

function printNamingConvention(conventions: NamingConvention[]): string {
  const selectorMap: Record<NamingConventionSelector, string> = {
    accessor: "Accessors",
    autoAccessor: "Auto Accessors",
    class: "Classes",
    classicAccessor: "Classic Accessors (`get`/`set`)",
    classMethod: "Class Methods",
    classProperty: "Class Properties",
    default: "Everything Else",
    enum: "Enums",
    enumMember: "Enum Members",
    function: "Functions",
    import: "Import Statements",
    interface: "Interfaces",
    memberLike: "Member-Like (Accessors, Enum Members, Methods, Properties)",
    method: "Class/Object/Type Methods",
    objectLiteralMethod: "Object Literal Methods",
    objectLiteralProperty: "Object Literal Properties",
    parameter: "Parameters",
    parameterProperty: "Parameter Properties",
    property: "Class/Object/Type Properties",
    typeAlias: "Type Aliases",
    typeLike: "Type-Like (Classes, Enums, Interfaces, Type Aliases, Type Parameters)",
    typeMethod: "Type Methods",
    typeParameter: "Type Parameters",
    typeProperty: "Type Properties",
    variable: "Variables",
    variableLike: "Variable-Like (Function, Parameter, Variable)",
  } as const;
  const modifierMap: Record<keyof NamingConventionModifiers, string> = {
    "#private": "`#private`",
    default: "Default Imports",
    abstract: "`abstract`",
    async: "`async`",
    const: "Constants",
    destructured: "Destructured",
    exported: "Exported",
    global: "Global",
    namespace: "`namespace`s",
    override: "`override`s",
    private: "`private`",
    protected: "`protected`",
    public: "`public`",
    readonly: "`readonly`",
    requiresQuotes: "Require Quotes",
    static: "`static`",
    unused: "Unused",
  } as const;
  let conventionString = "";
  let currentSelector: NamingConventionSelector = "default";
  let hadModifiers = false;
  conventions.sort(namingConventionSort).forEach((item) => {
    if (currentSelector !== item.selector) {
      hadModifiers = false;
      currentSelector = item.selector;
    }
    let headingString = `${hadModifiers && typeof item.modifiers === "undefined" && typeof item.types === "undefined" ? "All Other " : ""}${selectorMap[item.selector]}`;
    if (typeof item.modifiers !== "undefined") {
      hadModifiers = true;
      if (item.modifiers[0] === "requiresQuotes") {
        headingString += " That ";
      } else {
        headingString += " That Are ";
      }
      headingString += item.modifiers.map((modifier) => modifierMap[modifier]).join(", ");
    }
    if (typeof item.types !== "undefined") {
      hadModifiers = true;
      if (typeof item.modifiers === "undefined") {
        headingString += " That Are ";
      } else {
        headingString += " And Are ";
      }
      headingString += item.types.map((type) => `${capitalize(type)}s`).join("/");
    }
    conventionString += header(heading.three, headingString);
    const ruleList: string[] = [];
    switch (item.leadingUnderscore) {
      case "allow":
        ruleList.push("**Leading Underscore:** ✅ Allowed (single)");
        break;
      case "require":
        ruleList.push("**Leading Underscore:** *️⃣ Required (single)");
        break;
      case "allowDouble":
        ruleList.push("**Leading Underscore:** ✅ Allowed (double)");
        break;
      case "requireDouble":
        ruleList.push("**Leading Underscore:** *️⃣ Required (double)");
        break;
      case "forbid":
        ruleList.push("**Leading Underscore:** ❌ Forbidden");
        break;
      case "allowSingleOrDouble":
      default:
        ruleList.push("**Leading Underscore:** ✅ Allowed (single/double)");
    }
    if (typeof item.prefix === "undefined") {
      if (item.format) {
        ruleList.push(`**Format:** ${item.format.join(", ")}`);
      } else {
        ruleList.push("**Format:** Any");
      }
    } else {
      const { prefix } = item;
      ruleList.push(
        `**Requires Indicative Prefix:** ${item.prefix.map((itemPrefix) => itemPrefix.replace("_", "\\_")).join(", ")}`,
      );
      if (item.format) {
        ruleList.push(
          `**Format:** ${item.format.map((format) => (prefix.includes("Are") ? format : format.replace("PascalCase", "camelCase"))).join(", ")}`,
        );
      } else {
        ruleList.push("**Format:** Any");
      }
    }
    switch (item.trailingUnderscore) {
      case "allow":
        ruleList.push("**Trailing Underscore:** ✅ Allowed (single)");
        break;
      case "require":
        ruleList.push("**Trailing Underscore:** *️⃣ Required (single)");
        break;
      case "allowDouble":
        ruleList.push("**Trailing Underscore:** ✅ Allowed (double)");
        break;
      case "requireDouble":
        ruleList.push("**Trailing Underscore:** *️⃣ Required (double)");
        break;
      case "forbid":
        ruleList.push("**Trailing Underscore:** ❌ Forbidden");
        break;
      case "allowSingleOrDouble":
      default:
        ruleList.push("**Trailing Underscore:** ✅ Allowed (single/double)");
    }

    conventionString += list(ruleList);
  });
  return conventionString;
}

const rulesReadmePath = join(process.cwd(), "src", "rules", "README.md");

let readmeMarkdown = `
${admonish([{ type: "caution", text: `This file is auto-generated by ${link("docs.ts", "/scripts/docs.ts")} and should not be edited directly.` }])}
${header(heading.one, "Rules")}
${paragraph(`Below are all the rules in their respective categories this configuration works with, excluding any enabled by built-in configurations that don't need their settings overridden.`)}
${header(heading.two, "Legend")}
${list(["🛑 Throws a Linting Error", "⚠️ Emits a Warning", "🔲 Intentionally Disabled"])}
`;

[baseRules, handledByTypescript, javascriptWithinTypescript, typescript, typescriptExtensions].forEach((group) => {
  readmeMarkdown += `${header(heading.two, group.name)}${paragraph(group.description)}${admonish(group.admonishments)}`;
  group.rules.forEach((rule) => {
    switch (rule.severity) {
      case "error":
        readmeMarkdown += header(heading.three, link(`🛑 ${rule.name}`, rule.url));
        break;
      case "warn":
        readmeMarkdown += header(heading.three, link(`⚠️ ${rule.name}`, rule.url));
        break;
      case "off":
        readmeMarkdown += header(heading.three, link(`🔲 ${rule.name}`, rule.url));
        break;
    }
    if (typeof rule.settings !== "undefined") {
      readmeMarkdown += header(heading.four, "Settings");
      if (
        ["no-restricted-syntax", "@typescript-eslint/member-ordering", "@typescript-eslint/naming-convention"].includes(
          rule.name,
        )
      ) {
        readmeMarkdown += paragraph("(omitted to save space)");
      } else {
        readmeMarkdown += json(rule.settings);
      }
    }
    readmeMarkdown += admonish(rule.admonishments);
  });
});

await writeFile(rulesReadmePath, readmeMarkdown, "utf-8");

const namingConventionMarkdownPath = join(process.cwd(), "src", "rules", "naming-conventions.md");

const namingConventionMarkdown = `
${admonish([{ type: "caution", text: `This file is auto-generated by ${link("docs.ts", "/scripts/docs.ts")} and should not be edited directly.` }])}
${header(heading.one, "Naming Conventions")}
${admonish([{ type: "tip", text: `The naming conventions are defined using selectors provided by typescript-eslint; ${link("see their documentation for more information.", "https://typescript-eslint.io/rules/naming-convention/")}` }])}
${header(heading.two, "Base")}
${paragraph("These rules are applied to both the `default` and `allow-pascal-case-constants` naming conventions.")}
${printNamingConvention(baseNamingConvention)}
${header(heading.two, "Default")}
${paragraph("In addition to the above base rules, these rules are applied to the `default` naming convention.")}
${printNamingConvention(defaultConstCases)}
${header(heading.two, "Allow PascalCase Constants")}
${paragraph("In addition to the above base rules, these rules are applied to the `allow-pascal-case-constants` naming convention.")}
${printNamingConvention(pascalCaseConstants)}
`;

await writeFile(namingConventionMarkdownPath, namingConventionMarkdown, "utf-8");

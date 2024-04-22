const classMemberOrdering = {
  memberTypes: [
    /*
     *Group by Fields - Static Initialization - Constructors - Methods
     *Group Fields and Methods by Static and Instance
     *Group Static and Instance by Visibility (public - protected - private - #private)
     *For Fields, Group Visibilities by presence/absence of readonly modifier
     */

    // Fields
    "public-static-readonly-field",
    "public-static-field",
    "protected-static-readonly-field",
    "protected-static-field",
    "private-static-readonly-field",
    "private-static-field",
    "#private-static-readonly-field",
    "#private-static-field",
    "static-readonly-field",
    "static-field",

    "public-readonly-field",
    "public-field",
    "protected-readonly-field",
    "protected-field",
    "private-readonly-field",
    "private-field",
    "#private-readonly-field",
    "#private-field",
    "readonly-field",
    "field",

    // Static Initialization
    "static-initialization",

    // Constructors
    "public-constructor",
    "protected-constructor",
    "private-constructor",
    "constructor",

    // Methods
    "public-static-method",
    "protected-static-method",
    "private-static-method",
    "#private-static-method",
    "static-method",

    "public-method",
    "protected-method",
    "private-method",
    "#private-method",
    "method",
  ],
  // Required, then optional at the lowest subgroup
  optionalityOrder: "required-first",
  // Within the required and optional final subgroups, alphabetical order
  order: "natural",
};

const interfaceAndTypeLiteralMemberOrdering = {
  memberTypes: ["readonly-field", "field", "readonly-signature", "signature", "constructor", "method"],
  order: "natural",
  optionalityOrder: "required-first",
};

const memberOrdering = {
  classes: classMemberOrdering,
  classExpressions: classMemberOrdering,
  default: {
    memberTypes: ["readonly-field", "field", "readonly-signature", "signature", "method"],
    order: "natural",
    optionalityOrder: "required-first",
  },
  interfaces: interfaceAndTypeLiteralMemberOrdering,
  typeLiterals: interfaceAndTypeLiteralMemberOrdering,
};

export default memberOrdering;

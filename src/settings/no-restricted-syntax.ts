const noRestrictedSyntax = [
  {
    selector: ":matches(PropertyDefinition, MethodDefinition) > PrivateIdentifier.key",
    message: `Avoid using #private elements; they don't always behave well, e.g. when proxying a class.
              Make their access "private", or if this is intentional for security reasons, disable for this line.`,
  },
  {
    selector: "CallExpression[callee.name='setTimeout'][arguments.length!=2]",
    message: "setTimeout must always be invoked with two arguments.",
  },
  {
    selector: "CallExpression[callee.object.name][callee.property.name='forEach'][arguments.0.async=true]",
    message: `Don't use async/await in a forEach callback on an array. Use a for...of loop or Promise.all() instead.
              If this is intentional on an item that is not an array, disable for this line.`,
  },
  {
    selector: "MemberExpression[object.property.name='constructor'][property.name='name']",
    message: `'constructor.name' is not reliable after code minifier usage.
               Consider 'instanceof' or other identifiers instead.`,
  },
  {
    selector: "TSEnumDeclaration",
    message: `Don't use enums; they aren't erasable in applications, and have mixed behavior depending on their values.
              Use a const object using the "as const" indicator instead.`,
  },
  {
    selector: "TSTupleType > :not(TSNamedTupleMember, TSRestType)",
    message: "All tuple members should have labels to indicate what they are for, using 'label: Type'",
  },
  {
    selector: "TSTupleType > TSRestType:not(:has(TSNamedTupleMember))",
    message: "Rest tuple members should have labels to indicate what they are for, using '...rest: Type[]'",
  },
];

export default noRestrictedSyntax;

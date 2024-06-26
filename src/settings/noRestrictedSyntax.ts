const noRestrictedSyntax = [
  {
    selector: 'PropertyDefinition[key.type="PrivateIdentifier"]',
    message: `Avoid using #private properties/methods; they don't always behave well, e.g. when proxying a class.
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
    selector: "TSEnumDeclaration[const=true]",
    message: "Don't use const enums; they don't work well with common TypeScript configurations.",
  },
];

export default noRestrictedSyntax;

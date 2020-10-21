export const is = {
  arr: <T = any>(a: T & any): a is Array<T> => Array.isArray(a),
  obj: <T = any>(a: T & any): a is { [key: string]: T } => a.constructor.name === 'Object',
  fun: (a: unknown): a is Function => typeof a === 'function',
  str: (a: unknown): a is string => typeof a === 'string',
  num: (a: unknown): a is number => typeof a === 'number',
  und: (a: unknown): a is undefined => a === undefined,
}

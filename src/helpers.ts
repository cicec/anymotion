export const is = {
  arr: <T = any>(a: T & any): a is Array<T> => Array.isArray(a),
  obj: <T = any>(a: T & any): a is { [key: string]: T } => a.constructor.name === 'Object',
  fun: (a: unknown): a is Function => typeof a === 'function',
  str: (a: unknown): a is string => typeof a === 'string',
  num: (a: unknown): a is number => typeof a === 'number',
  und: (a: unknown): a is undefined => a === undefined,
}

export const regex = {
  number: /(-)?(\d[\d\.]*)/g,
  color: /(#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})|(rgb|hsl)a?\((-?[\d.]+%?[,\s]+){2,3}\s*[\d.]+%?\))/gi,
  singleColor: /^(#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})|(rgb|hsl)a?\((-?[\d.]+%?[,\s]+){2,3}\s*[\d.]+%?\))$/i,
}

export const clamp = (min: number, max: number) => (v: number) => Math.max(min, Math.min(v, max))

export const sanitize = (v: number) => (v % 1 ? Number(v.toFixed(5)) : v)

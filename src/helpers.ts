type Obj<K extends string | number, V> = { [key in K]: V }

export const is = {
  fun: (v: any): v is Function => typeof v === 'function',
  obj: (v: any): v is Obj<any, any> => Object.prototype.toString.call(v) === '[object Object]',
}

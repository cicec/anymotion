import { is } from './helpers'
import { Observable } from './observable'
import { map } from './operators'
import { color } from './color'
import { Record, Motion, MotionOptions } from './types'

const mapArrs = <T>(arr1: T[], arr2: T[]) => (operate: (v1: T, v2: T, index: number) => T) =>
  Array(Math.min(arr1.length, arr2.length))
    .fill(0)
    .map((_, i) => operate(arr1[i], arr2[i], i))

const mapObjs = <T extends Record = Record, V = T[keyof T]>(obj1: T, obj2: T) => (
  operate: (v1: V, v2: V) => V
) => {
  const keys = Object.keys(obj1).filter(key => Object.keys(obj2).includes(key))
  const ret: Record<string, V> = {}

  keys.forEach((_, i) => {
    const key = keys[i]
    ret[key] = operate(obj1[key], obj2[key])
  })

  return ret as T
}

const getMapper = (from: any, to: any): ((progress: number) => any) => {
  if (is.num(from) && is.num(to)) {
    return progress => from + (to - from) * progress
  }

  if (is.str(from) && is.str(to)) {
    if (color.test(from) && color.test(to)) {
      const fromColor = color.parse(from)
      const toColor = color.parse(to)
      const range = mapObjs(fromColor, toColor)((v1, v2) => v2 - v1)

      return progress => color.stringify(mapObjs(fromColor, range)((v1, v2) => v1 + v2 * progress))
    }
  }

  if (is.arr(from) && is.arr(to)) {
    return progress => mapArrs(from, to)((v1, v2) => getMapper(v1, v2)(progress))
  }

  if (is.obj(from) && is.obj(to)) {
    return progress => mapObjs(from, to)((v1, v2) => getMapper(v1, v2)(progress))
  }

  throw new Error('Incorrect type: ' + from + ' & ' + to)
}

export const factory = (motion: Motion) => <T>({
  from,
  to,
  config,
}: MotionOptions<T>): Observable<T> => motion(config).pipe<T>(map<number, T>(getMapper(from, to)))

import { color } from './color'
import { map } from '../operators/map'
import { is } from '../helpers'
import { Action } from '../action'
import { Record, Motion, MotionOptions } from '../types'

type Mapper<T> = (progress: number) => T

const reduceArrays = <T>(arr1: T[], arr2: T[]) => (
  predicate: (v1: T, v2: T, index: number) => T
) => {
  return Array(Math.min(arr1.length, arr2.length))
    .fill(0)
    .map((_, i) => predicate(arr1[i], arr2[i], i))
}

const reduceObjects = <T extends Record, V = T[keyof T]>(o1: T, o2: T) => (
  predicate: (v1: V, v2: V) => V
) => {
  const keys = Object.keys(o1).filter(key => Object.keys(o2).includes(key))
  const ret: Record = {}

  keys.forEach((_, i) => {
    const key = keys[i]
    ret[key] = predicate(o1[key], o2[key])
  })

  return ret as T
}

const mapColor = (from: string, to: string): Mapper<string> => {
  const fromColor = color.parse(from)
  const toColor = color.parse(to)
  const range = reduceObjects(fromColor, toColor)((v1, v2) => v2 - v1)

  return progress =>
    color.stringify(reduceObjects(fromColor, range)((v1, v2) => v1 + v2 * progress))
}

const mapNumber = (from: number, to: number): Mapper<number> => {
  return progress => from + (to - from) * progress
}

const mapArray = <T>(from: T[], to: T[]): Mapper<T[]> => {
  return progress => reduceArrays(from, to)((v1, v2) => getMapper(v1, v2)(progress))
}

const mapObject = <T extends Record>(from: T, to: T): Mapper<T> => {
  return progress => reduceObjects(from, to)((v1, v2) => getMapper(v1, v2)(progress))
}

const getMapper = (from: any, to: any): ((progress: number) => any) => {
  if (is.str(from) && is.str(to)) {
    if (color.test(from) && color.test(to)) return mapColor(from, to)
  }

  if (is.num(from) && is.num(to)) return mapNumber(from, to)
  if (is.arr(from) && is.arr(to)) return mapArray(from, to)
  if (is.obj(from) && is.obj(to)) return mapObject(from, to)

  throw new Error('Incorrect type: ' + from + ' & ' + to)
}

export const factory = (motion: Motion) => <T>({
  from,
  to,
  config,
}: MotionOptions<T>): Action<T> => {
  return motion(config).pipe<T>(map(getMapper(from, to)))
}

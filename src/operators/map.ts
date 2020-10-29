import { operate } from './operate'

export const map = <T, R>(predicate: (value: T) => R) =>
  operate<T, R>(({ update }) => value => update(predicate(value)))

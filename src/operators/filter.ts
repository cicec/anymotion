import { operate } from './operate'

export const filter = <T>(predicate: (value: T) => boolean) =>
  operate<T>(({ update }) => value => predicate(value) && update(value))

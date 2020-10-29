import { operate } from './operate'

export const every = <T>(predicate: (value: T) => boolean) =>
  operate<T, boolean>(({ update, complete }) => ({
    update: value => {
      if (!predicate(value)) {
        update(false)
        complete()
      }
    },
    complete: () => {
      update(true)
      complete()
    },
  }))

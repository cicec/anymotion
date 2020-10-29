import { operate } from './operate'

export const some = <T>(predicate: (value: T) => boolean) =>
  operate<T, boolean>(({ update, complete }) => ({
    update: value => {
      if (predicate(value)) {
        update(true)
        complete()
      }
    },
    complete: () => {
      update(false)
      complete()
    },
  }))

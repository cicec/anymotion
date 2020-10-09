import { is } from './helpers'
import { Observable, Subscriber } from './observable'
import { UpdateObserver, Operation } from './types'

export const operate = <T, R = T>(
  predicate: (subscriber: Subscriber<R>) => UpdateObserver<T> | ((value: T) => void)
): Operation<T, R> => (source: Observable<T>) =>
  new Observable<R>(subscriber => {
    const observer = predicate(subscriber)

    if (is.fun(observer)) {
      source.start({ ...subscriber.observer, update: observer })
    } else {
      source.start({ ...subscriber.observer, ...observer })
    }
  })

export const map = <T, R>(predicate: (value: T) => R) =>
  operate<T, R>(({ update }) => value => update(predicate(value)))

export const filter = <T>(predicate: (value: T) => boolean) =>
  operate<T>(({ update }) => value => predicate(value) && update(value))

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

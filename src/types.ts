import { Observable, Subscriber } from './observable'

export type PartialObserver<T> = {
  update?: (value: T) => void
  complete?: () => void
  error?: (err: any) => void
}
export type UpdateObserver<T> = PartialObserver<T> & { update: (value: T) => void }
export type Unsubscribe = (() => void) | void
export type Subscribe<T> = (subscriber: Subscriber<T>) => Unsubscribe | void
export type Operation<T, R> = (source: Observable<T>) => Observable<R>

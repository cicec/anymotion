import { is } from './helpers'

type Observer<T> = {
  update?: (value: T) => void
  error?: (err: any) => void
  complete?: () => void
}
type Unsubscribe = (() => void) | void
type Subscribe<T> = (subscriber: Subscriber<T>) => Unsubscribe | void

const isObserver = <T>(v: any): v is Observer<T> =>
  is.obj(v) && (is.fun(v.next) || is.fun(v.error) || is.fun(v.complete))

class Subscriber<T> {
  private isActive = true
  private observer: Observer<T>

  constructor(observer: Observer<T> = {}) {
    this.observer = observer
  }

  update(value: T) {
    if (this.observer.update) this.observer.update(value)
  }

  complete() {
    if (this.observer.complete && this.isActive) this.observer.complete()
    this.isActive = false
  }

  error(err: any) {
    if (this.observer.error && this.isActive) this.observer.error(err)
    this.isActive = false
  }
}

const createSubscriber = <T>(observer?: Observer<T> | ((value: T) => void)) => {
  if (isObserver<T>(observer)) {
    return new Subscriber<T>(observer)
  }

  if (is.fun(observer)) {
    return new Subscriber<T>({ update: observer })
  }

  return new Subscriber<T>()
}

const createSubscription = (unsubscribe: Unsubscribe) => ({
  stop: () => {
    if (unsubscribe) unsubscribe()
  },
})

export class Observable<T> {
  private subscribe: Subscribe<T>
  private unsubscribe?: Unsubscribe

  constructor(subscribe?: Subscribe<T>) {
    this.subscribe = subscribe ?? (() => () => {})
  }

  start(observer?: Observer<T> | ((value: T) => void)) {
    const subscriber = createSubscriber<T>(observer)

    this.unsubscribe = this.subscribe(subscriber)

    return createSubscription(this.unsubscribe)
  }
}

export const observable = <T>(subscribe?: Subscribe<T>) => new Observable(subscribe)

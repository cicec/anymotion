import { is } from './helpers'
import { PartialObserver, Unsubscribe, Subscribe, Operation } from './types'

export class Subscriber<T> {
  observer: PartialObserver<T>
  isActive = true

  constructor(candidate?: PartialObserver<T> | ((value: T) => void)) {
    if (candidate) {
      if (is.fun(candidate)) {
        this.observer = { update: candidate }
      } else {
        this.observer = candidate
      }
    }
  }

  update = (value: T) => {
    if (this.observer.update && this.isActive) this.observer.update(value)
  }

  complete = () => {
    if (this.observer.complete && this.isActive) this.observer.complete()
    this.isActive = false
  }

  error = (err: any) => {
    if (this.observer.error && this.isActive) this.observer.error(err)
    this.isActive = false
  }
}

export class Subscription {
  private unsubscribe: Unsubscribe

  constructor({ unsubscribe }: { unsubscribe: Unsubscribe }) {
    this.unsubscribe = unsubscribe
  }

  stop() {
    if (this.unsubscribe) this.unsubscribe()
  }
}

export class Observable<T> {
  private subscribe: Subscribe<T>

  constructor(subscribe: Subscribe<T> = () => {}) {
    this.subscribe = subscribe
  }

  start(observer?: PartialObserver<T>): Subscription
  start(update?: (value: T) => void): Subscription
  start(candidate?: PartialObserver<T> | ((value: T) => void)) {
    const subscriber = new Subscriber<T>(candidate)
    const unsubscribe = this.subscribe(subscriber)

    return new Subscription({ unsubscribe })
  }

  pipe(...operations: Operation<any, any>[]): Observable<any> {
    if (operations.length === 0) return this

    return operations.reduce<Observable<any>>((prev, operation) => operation(prev), this)
  }
}

export const observable = <T>(subscribe?: Subscribe<T>) => new Observable(subscribe)

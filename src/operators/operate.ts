import { is } from '../helpers'
import { action, Action, Subscriber, Subscription } from '../action'
import { UpdateObserver, Operation } from '../types'

export const operate = <T, R = T>(
  predicate: (subscriber: Subscriber<R>) => UpdateObserver<T> | ((value: T) => void)
): Operation<T, R> => (source: Action<T>) =>
  action<R>(subscriber => {
    const observer = predicate(subscriber)
    let subscription: Subscription

    if (is.fun(observer)) {
      subscription = source.start({ ...subscriber.observer, update: observer })
    } else {
      subscription = source.start({ ...subscriber.observer, ...observer })
    }

    return () => subscription.stop()
  })

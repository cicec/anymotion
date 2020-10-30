import { Action, Subscriber, Subscription } from './action'

export type Record<K extends string | number | symbol = string, V = any> = { [key in K]: V }

export type PartialObserver<T> = {
  update?: (value: T) => void
  complete?: () => void
  error?: (err: any) => void
}
export type UpdateObserver<T> = PartialObserver<T> & { update: (value: T) => void }
export type Unsubscribe = (() => void) | void
export type Subscribe<T> = (subscriber: Subscriber<T>) => Unsubscribe | void
export type Operation<T, R> = (source: Action<T>) => Action<R>

export type SpringConfig = {
  tension?: number
  friction?: number
  mass?: number
  precision?: number
}
export type MotionConfig = SpringConfig
export type Motion = (config?: MotionConfig) => Action<number>
export type MotionOptions<T> = { to?: T; from?: T; config?: MotionConfig }

export { Action, Subscriber, Subscription }

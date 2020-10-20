import { is } from './helpers'
import { Observable } from './observable'
import { operate } from './operators'
import { MotionConfig } from './types'

type Motion = (config?: MotionConfig) => Observable<number>
type MotionOptions<T> = { to?: T; from?: T; config?: MotionConfig }

export const factory = (motion: Motion) => <T>(options: MotionOptions<T>): Observable<T> => {
  const { from, to, config } = options

  if (is.num(from) && is.num(to)) {
    return motion(config).pipe<T>(
      operate(({ update }) => progress => update(from + (to - from) * progress))
    )
  }

  throw ''
}

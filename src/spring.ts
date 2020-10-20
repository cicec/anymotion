import { factory } from './factory'
import { frame } from './frame'
import { observable } from './observable'
import { SpringConfig } from './types'

const defaultConfig = { tension: 170, friction: 26, mass: 1, precision: 0.01 }

export const spring = factory((config?: SpringConfig) =>
  observable<number>(({ update, complete }) => {
    const { tension, friction, mass, precision } = { ...defaultConfig, ...config }

    let velocity = 0
    let progress = 0

    return frame(({ delta, cancelFrame }) => {
      const dt = delta / 1000
      const force = tension * (1 - progress)
      const damping = -friction * velocity

      velocity += ((force + damping) / mass) * dt
      progress += velocity * dt

      if (Math.abs(1 - progress) < precision && Math.abs(velocity) < precision / 10) {
        progress = 1
        velocity = 0

        update(progress)
        complete()
        cancelFrame()
      } else {
        update(progress)
      }
    })
  })
)

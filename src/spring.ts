import { observable } from './observable'

type Config = {
  tension?: number
  friction?: number
  mass?: number
  precision: number
  velocity: number
}
type Options = { to?: number; from?: number; config?: Config }

const defaultConfig = { tension: 170, friction: 26, mass: 1, precision: 0.01, velocity: 0 }
const defaultOptions = { to: 0, from: 0, config: defaultConfig }

const spring = (options?: Options) =>
  observable<number>(subscriber => {
    const { to, from, config } = { ...defaultOptions, ...options }
    const { tension, friction, mass, precision } = { ...defaultConfig, ...config }

    let { velocity } = { ...defaultConfig, ...config }
    let position = from
    let time = performance.now()
    let animationId = 0

    const update = () => {
      const pt = time
      time = performance.now()
      const dt = (time - pt) / 1000

      const force = tension * (to - position)
      const damping = -friction * velocity

      velocity += ((force + damping) / mass) * dt
      position += velocity * dt

      if (Math.abs(to - position) < precision && Math.abs(velocity) < precision) {
        position = to
        velocity = 0
        subscriber.update(position)
        subscriber.complete()
      } else {
        subscriber.update(position)
        animationId = requestAnimationFrame(update)
      }
    }

    update()

    return () => cancelAnimationFrame(animationId)
  })

export { spring }

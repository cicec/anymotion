export const frame = (process: (options: { delta: number; cancelFrame: () => void }) => void) => {
  const maxElapsed = 40

  let completed = false
  let now: number = performance.now()

  const requestFrame = requestAnimationFrame
  const cancelFrame = () => {
    completed = true
  }

  const update = () => {
    const pt = now
    now = performance.now()
    const delta = now - pt < maxElapsed ? now - pt : maxElapsed

    process({ delta, cancelFrame })

    if (!completed) requestFrame(update)
  }

  update()

  return cancelFrame
}

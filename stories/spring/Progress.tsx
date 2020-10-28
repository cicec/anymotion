import React, { useState, useRef, useEffect } from 'react'
import { spring } from '../../src'
import { Subscription } from '../../src/action'

export const Progress = ({ ...args }) => {
  const [open, toggle] = useState(false)
  const [value, setValue] = useState(20)

  const subscription = useRef<Subscription>()

  useEffect(() => {
    return () => subscription.current?.stop()
  }, [])

  useEffect(() => {
    subscription.current?.stop()
    subscription.current = spring({ from: value, to: open ? 80 : 20, config: args }).start(value =>
      setValue(value)
    )
  }, [open])

  return (
    <div className="progress-container p-6">
      <progress className="progress is-primary is-medium" value={value} max="100"></progress>
      <button className="button is-primary" onClick={() => toggle(!open)}>
        CLICK
      </button>
    </div>
  )
}

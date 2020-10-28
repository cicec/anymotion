import React, { useState, useEffect, useRef } from 'react'
import { spring } from '../../src'
import { Subscription } from '../../src/action'

export const Rect = ({ ...config }) => {
  const [open, toggle] = useState(false)
  const [styles, set] = useState({
    translate: 0,
    scale: 1,
    rotate: 0,
    borderRadius: 50,
  })

  const rect = useRef<HTMLDivElement>()
  const subscription = useRef<Subscription>()

  useEffect(() => {
    rect.current.addEventListener('mouseenter', () => toggle(true))
    rect.current.addEventListener('mouseleave', () => toggle(false))
  }, [])

  useEffect(() => {
    const from = styles
    const to = open
      ? { translate: -20, scale: 1.2, rotate: 180, borderRadius: 10 }
      : { translate: 0, scale: 1, rotate: 0, borderRadius: 50 }

    subscription.current?.stop()
    subscription.current = spring({ from, to, config }).start(value => set(value))
  }, [open])

  const { translate, scale, rotate, borderRadius } = styles

  return (
    <div className="rect-container p-6">
      <div
        ref={rect}
        className="rect has-background-primary"
        style={{
          transform: `translateY(${translate}%) scale(${scale}) rotate(${rotate}deg)`,
          borderRadius: `${borderRadius}%`,
        }}
      ></div>
    </div>
  )
}

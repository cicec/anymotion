import React, { useState, useEffect, useRef } from 'react'
import { spring } from '../../src'
import { Subscription } from '../../src/action'

export const Rect = ({ ...config }) => {
  const [open, toggle] = useState(false)
  const [styles, set] = useState({
    transform: 'translateY(0%) scale(1) rotate(0deg)',
    borderRadius: '50%',
    backgroundColor: '#00d1b2',
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
      ? {
          transform: 'translateY(-20%) scale(1.2) rotate(180deg)',
          borderRadius: '10%',
          backgroundColor: '#ffdd57',
        }
      : {
          transform: 'translateY(0%) scale(1) rotate(0deg)',
          borderRadius: '50%',
          backgroundColor: '#00d1b2',
        }

    subscription.current?.stop()
    subscription.current = spring({ from, to, config }).start(value => set(value))
  }, [open])

  const { transform, borderRadius, backgroundColor } = styles

  return (
    <div className="rect-container p-6">
      <div ref={rect} className="rect" style={{ transform, borderRadius, backgroundColor }}></div>
    </div>
  )
}

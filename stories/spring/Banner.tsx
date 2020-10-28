import React, { useState, useRef } from 'react'
import { spring } from '../../src'
import { Subscription } from '../../src/action'

const BannerItem = ({ name, background }) => (
  <div key={name} className="banner-item" style={{ background }}>
    {name}
  </div>
)

const banners = [
  { name: 'A', background: '#00d1b2' },
  { name: 'B', background: '#ffdd57' },
  { name: 'C', background: '#ff3860' },
]

let index = 0

export const Banner = ({ ...config }) => {
  const [translateX, setTranslateX] = useState(0)

  const subscription = useRef<Subscription>()

  const next = () => {
    let nextIndex = ++index
    if (index > banners.length - 1) nextIndex = index = 0

    subscription.current?.stop()
    subscription.current = spring({
      from: translateX,
      to: -index * 100,
      config,
    }).start(value => setTranslateX(value))
  }

  return (
    <div className="banner-container" onClick={next}>
      <div className="banner-list" style={{ transform: `translateX(${translateX}%)` }}>
        {banners.map(banner => BannerItem(banner))}
      </div>
    </div>
  )
}

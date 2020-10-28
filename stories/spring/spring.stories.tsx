import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Progress } from './Progress'
import { Rect } from './Rect'
import { Banner } from './Banner'

import './spring.scss'

const meta: Meta = {
  title: 'Spring',
  decorators: [
    Story => (
      <div className="sb-show-root">
        <Story />
      </div>
    ),
  ],
  args: { tension: 170, friction: 26, mass: 1, precision: 0.01 },
  argTypes: {
    tension: { control: { type: 'range', min: 0, max: 500 } },
    friction: { control: { type: 'range', min: 0, max: 100 } },
    mass: { control: { type: 'range', min: 1, max: 10 } },
  },
}

export default meta
export { Progress, Rect, Banner }

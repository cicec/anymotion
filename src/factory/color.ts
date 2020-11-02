import { is, regex, clamp, sanitize } from '../helpers'
import { Record } from '../types'

type RGBA = { r: number; g: number; b: number; a: number }
type HSLA = { h: number; s: number; l: number; a: number }

export type Color = RGBA | HSLA

const isRgba = (v: Record): v is RGBA => is.num(v.a) && is.num(v.g) && is.num(v.b) && is.num(v.a)

const testColorText = (text: string, type: '#' | 'hsl' | 'rgb') => {
  return regex.singleColor.test(text) && text.startsWith(type)
}

const parseColorText = (text: string) => {
  return text
    .replace(/(rgb|hsl)a?\(|\)/gi, '')
    .split(/,\s*/)
    .map(i => parseFloat(i))
}

const hex = {
  test: (text: string) => testColorText(text, '#'),
  parse: (text: string): RGBA => {
    text = text.replace(/#/, '')

    if (text.length === 3) text = `${text.replace(/(.)/g, '$1$1')}ff`
    if (text.length === 4) text = `${text.replace(/(.)/g, '$1$1')}`
    if (text.length === 6) text = `${text}ff`

    const hexToInt = (hex: string) => parseInt(hex, 0x10)

    return rgb.create(
      hexToInt(text.substr(0, 2)),
      hexToInt(text.substr(2, 2)),
      hexToInt(text.substr(4, 2)),
      hexToInt(text.substr(6, 2)) / 255
    )
  },
}

const rgb = {
  create: (r: number, g: number, b: number, a: number): RGBA => ({ r, g, b, a }),
  template: ({ r, g, b, a }: RGBA) => `rgba(${r}, ${g}, ${b}, ${a})`,
  test: (text: string) => testColorText(text, 'rgb'),
  parse: (text: string) => {
    const [r, g, b, a = 1] = parseColorText(text)

    return rgb.create(r, g, b, a)
  },
  stringify: ({ r, g, b, a }: RGBA) => {
    const transformRgb = (v: number) => Math.round(clamp(0, 255)(v))

    return rgb.template({
      r: transformRgb(r),
      g: transformRgb(g),
      b: transformRgb(b),
      a: sanitize(clamp(0, 1)(a)),
    })
  },
}

const hsl = {
  create: (h: number, s: number, l: number, a: number): HSLA => ({ h, s, l, a }),
  template: ({ h, s, l, a }: HSLA) => `hsla(${h}, ${s}%, ${l}%, ${a})`,
  test: (text: string) => testColorText(text, 'hsl'),
  parse: (text: string): HSLA => {
    const [h, s, l, a = 1] = parseColorText(text)

    return hsl.create(h, s, l, a)
  },
  stringify: ({ h, s, l, a }: HSLA) => {
    return hsl.template({
      h: Math.round(h),
      s: sanitize(clamp(0, 100)(s)),
      l: sanitize(clamp(0, 100)(l)),
      a: sanitize(clamp(0, 1)(a)),
    })
  },
}

export const color = {
  test: (text: string) => regex.singleColor.test(text),
  parse: (text: string): Color => {
    if (hex.test(text)) return hex.parse(text)
    if (rgb.test(text)) return rgb.parse(text)
    if (hsl.test(text)) return hsl.parse(text)

    throw new Error('Incorrect color format')
  },
  stringify: (color: Color): string => {
    if (isRgba(color)) return rgb.stringify(color)
    return hsl.stringify(color)
  },
}

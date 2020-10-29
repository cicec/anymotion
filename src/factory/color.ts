const hexReg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/
const rgbReg = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
const hslReg = /^hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*(\d+(?:\.\d+)?))?\)$/

type RGBA = { r: number; g: number; b: number; a: number }

const rgba = (r: number, g: number, b: number, a: number): RGBA => ({ r, g, b, a })

const parseHex = (color: string): RGBA => {
  color = color.replace(/#/, '')

  if (color.length === 3) color = `${color.replace(/(.)/g, '$1$1')}ff`
  if (color.length === 4) color = `${color.replace(/(.)/g, '$1$1')}`
  if (color.length === 6) color = `${color}ff`

  const hexToInt = (str: string) => parseInt(str, 0x10)

  return rgba(
    hexToInt(color[0] + color[1]),
    hexToInt(color[2] + color[3]),
    hexToInt(color[4] + color[5]),
    hexToInt(color[6] + color[7]) / 255
  )
}

const parseRgb = (color: string): RGBA => {
  let match = rgbReg.exec(color)

  if (match) {
    return rgba(
      parseInt(match[1]),
      parseInt(match[2]),
      parseInt(match[3]),
      match[4] ? parseFloat(match[4]) : 1
    )
  } else {
    throw new Error('Incorrect color format')
  }
}

const parseHsl = (color: string): RGBA => {
  let match = hslReg.exec(color)

  if (match) {
    const h = parseInt(match[1]) / 360
    const s = parseFloat(match[2]) / 100
    const l = parseFloat(match[3]) / 100
    const a = match[4] ? parseFloat(match[4]) : 1

    let r: number, g: number, b: number

    if (s === 0) {
      r = g = b = l
    }

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255)
    g = Math.round(hue2rgb(p, q, h) * 255)
    b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255)

    return rgba(r, g, b, a)
  } else {
    throw new Error('Incorrect color format')
  }
}

export const color = {
  test: (color: string) => hexReg.test(color) || rgbReg.test(color) || hslReg.test(color),
  parse: (color: string): RGBA => {
    if (hexReg.test(color)) return parseHex(color)
    if (rgbReg.test(color)) return parseRgb(color)
    if (hslReg.test(color)) return parseHsl(color)

    throw new Error('Incorrect color format')
  },
  stringify: ({ r, g, b, a }: RGBA) => `rgba(${r}, ${g}, ${b}, ${a})`,
}

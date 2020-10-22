import { color } from '../color'

const color1 = '#aabbcc'
const color2 = 'rgba(255, 255, 0, 0.2)'
const color3 = 'hsla(18, 58%, 57%, 0.4)'
const color4 = 'hsla(0, 0%, 100%, 0.4)'
const color5 = '#aaggcc'
const color6 = 'rg(255, 255, 0)'

describe('color', () => {
  test('test', () => {
    expect(color.test(color1)).toBeTruthy()
    expect(color.test(color2)).toBeTruthy()
    expect(color.test(color3)).toBeTruthy()
    expect(color.test(color4)).toBeTruthy()

    expect(color.test(color5)).toBeFalsy()
    expect(color.test(color6)).toBeFalsy()
  })

  test('parse', () => {
    expect(color.parse(color1)).toStrictEqual({ r: 170, g: 187, b: 204, a: 1 })
    expect(color.parse(color2)).toStrictEqual({ r: 255, g: 255, b: 0, a: 0.2 })
    expect(color.parse(color3)).toStrictEqual({ r: 209, g: 120, b: 82, a: 0.4 })
    expect(color.parse(color4)).toStrictEqual({ r: 255, g: 255, b: 255, a: 0.4 })
  })

  test('stringify', () => {
    expect(color.stringify({ r: 170, g: 187, b: 204, a: 1 })).toBe('rgba(170, 187, 204, 1)')
  })
})

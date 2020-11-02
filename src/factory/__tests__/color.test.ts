import { color } from '../color'

const hex1 = '#ff99cc66'
const hex2 = '#ff99cc'
const hex3 = '#f9c6'
const hex4 = '#f9c'
const hex5 = '#ff99cc6'
const hex6 = '#gg99cc'

const rgb1 = 'rgba(255, 153, 204, 0.4)'
const rgb2 = 'rgb(255, 153, 204)'
const rgb3 = 'rgba()'

const hsl1 = 'hsla(330, 100%, 80%, 0.4)'
const hsl2 = 'hsl(330, 100%, 80%)'
const hsl3 = 'hsll(330, 100%, 80%)'

describe('color', () => {
  test('test', () => {
    expect(color.test(hex1)).toBeTruthy()
    expect(color.test(hex2)).toBeTruthy()
    expect(color.test(hex3)).toBeTruthy()
    expect(color.test(hex4)).toBeTruthy()
    expect(color.test(hex5)).toBeFalsy()
    expect(color.test(hex6)).toBeFalsy()

    expect(color.test(rgb1)).toBeTruthy()
    expect(color.test(rgb2)).toBeTruthy()
    expect(color.test(rgb3)).toBeFalsy()

    expect(color.test(hsl1)).toBeTruthy()
    expect(color.test(hsl2)).toBeTruthy()
    expect(color.test(hsl3)).toBeFalsy()
  })

  test('parse', () => {
    expect(color.parse(hex1)).toStrictEqual({ r: 255, g: 153, b: 204, a: 0.4 })
    expect(color.parse(hex2)).toStrictEqual({ r: 255, g: 153, b: 204, a: 1 })
    expect(color.parse(hex3)).toStrictEqual({ r: 255, g: 153, b: 204, a: 0.4 })
    expect(color.parse(hex4)).toStrictEqual({ r: 255, g: 153, b: 204, a: 1 })

    expect(() => color.parse(hex5)).toThrowError('Incorrect color format')

    expect(color.parse(rgb1)).toStrictEqual({ r: 255, g: 153, b: 204, a: 0.4 })
    expect(color.parse(rgb2)).toStrictEqual({ r: 255, g: 153, b: 204, a: 1 })

    expect(() => color.parse(rgb3)).toThrowError('Incorrect color format')

    expect(color.parse(hsl1)).toStrictEqual({ h: 330, s: 100, l: 80, a: 0.4 })
    expect(color.parse(hsl2)).toStrictEqual({ h: 330, s: 100, l: 80, a: 1 })

    expect(() => color.parse(hsl3)).toThrowError('Incorrect color format')
  })

  test('stringify', () => {
    expect(color.stringify({ r: 255, g: 153, b: 204, a: 0.4 })).toBe('rgba(255, 153, 204, 0.4)')
    expect(color.stringify({ h: 330, s: 100, l: 80, a: 0.4 })).toBe('hsla(330, 100%, 80%, 0.4)')
  })
})

import { is, regex, clamp, sanitize } from '../helpers'

describe('helpers', () => {
  test('is', () => {
    expect(is.arr([1, 2, 3])).toBeTruthy()
    expect(is.obj({ a: 1, b: 2 })).toBeTruthy()
    expect(is.fun((a: number) => a)).toBeTruthy()
    expect(is.str('123')).toBeTruthy()
    expect(is.num(123)).toBeTruthy()
    expect(is.und(undefined)).toBeTruthy()
  })

  test('regex', () => {
    const text1 = '10px'
    const text2 = '10px 25px 25px 10px'
    const text3 = 'rgba(25, 25, 25, 20%)'
    const text4 = 'linear-gradient(to right, #333, #666)'

    expect(text1.match(regex.number)).toStrictEqual(['10'])
    expect(text2.match(regex.number)).toStrictEqual(['10', '25', '25', '10'])

    expect(text1.match(regex.color)).toBeNull()
    expect(text3.match(regex.color)).toStrictEqual(['rgba(25, 25, 25, 20%)'])
    expect(text4.match(regex.color)).toStrictEqual(['#333', '#666'])

    expect(regex.singleColor.test(text3)).toBeTruthy()
    expect(regex.singleColor.test(text4)).toBeFalsy()
  })

  test('clamp', () => {
    expect(clamp(0, 10)(5)).toBe(5)
    expect(clamp(0, 10)(-5)).toBe(0)
    expect(clamp(0, 10)(15)).toBe(10)
  })

  test('sanitize', () => {
    expect(sanitize(2 / 3)).toBe(0.66667)
  })
})

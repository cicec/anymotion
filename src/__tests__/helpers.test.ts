import { is } from '../helpers'

describe('helpers', () => {
  test('is', () => {
    expect(is.arr([1, 2, 3])).toBeTruthy()
    expect(is.obj({ a: 1, b: 2 })).toBeTruthy()
    expect(is.fun((a: number) => a)).toBeTruthy()
    expect(is.str('123')).toBeTruthy()
    expect(is.num(123)).toBeTruthy()
    expect(is.und(undefined)).toBeTruthy()
  })
})

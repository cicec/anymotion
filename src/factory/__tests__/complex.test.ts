import { complex } from '../complex'

const complex1 = 'linear-gradient(to right, #009fff, #ec2f4b)'
const complex2 = 'translate(0px, 0) scale(1) rotateX(0deg)'
const complex3 = '0px 10px 20px 0px rgba(0, 0, 0, 0.4)'
const complex4 = '10px solid #2D3747'
const complex5 = 'rgba()'
const complex6 = 'px'

describe('complex', () => {
  test('test', () => {
    expect(complex.test(complex1)).toBeTruthy()
    expect(complex.test(complex2)).toBeTruthy()
    expect(complex.test(complex3)).toBeTruthy()
    expect(complex.test(complex4)).toBeTruthy()

    expect(complex.test(complex5)).toBeFalsy()
    expect(complex.test(complex6)).toBeFalsy()
  })

  test('parse', () => {
    expect(complex.parse(complex1)).toStrictEqual({
      parsed: {
        colors: [
          { r: 0, g: 159, b: 255, a: 1 },
          { r: 236, g: 47, b: 75, a: 1 },
        ],
        numbers: [],
      },
      template: 'linear-gradient(to right, ${c}, ${c})',
    })

    expect(complex.parse(complex2)).toStrictEqual({
      parsed: { colors: [], numbers: [0, 0, 1, 0] },
      template: 'translate(${n}px, ${n}) scale(${n}) rotateX(${n}deg)',
    })

    expect(complex.parse(complex3)).toStrictEqual({
      parsed: { colors: [{ r: 0, g: 0, b: 0, a: 0.4 }], numbers: [0, 10, 20, 0] },
      template: '${n}px ${n}px ${n}px ${n}px ${c}',
    })

    expect(complex.parse(complex4)).toStrictEqual({
      parsed: { colors: [{ r: 45, g: 55, b: 71, a: 1 }], numbers: [10] },
      template: '${n}px solid ${c}',
    })
  })

  test('stringify', () => {
    expect(
      complex.stringify({
        parsed: { colors: [], numbers: [0, 0, 1, 0] },
        template: 'translate(${n}px, ${n}) scale(${n}) rotateX(${n}deg)',
      })
    ).toBe(complex2)

    expect(
      complex.stringify({
        parsed: { colors: [{ r: 0, g: 0, b: 0, a: 0.4 }], numbers: [0, 10, 20, 0] },
        template: '${n}px ${n}px ${n}px ${n}px ${c}',
      })
    ).toBe(complex3)
  })
})

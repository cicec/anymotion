import { color, RGBA } from './color'

type Parsed = { colors: RGBA[]; numbers: number[] }
type Complex = { template: string; parsed: Parsed }

const numberRegex = /(-)?(\d[\d\.]*)/g
const colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi

const COLOR_TOKEN = '${c}'
const NUMBER_TOKEN = '${n}'

export const complex = {
  test: (text: string) => {
    return text.match(colorRegex) || text.match(numberRegex)
  },
  parse: (text: string): Complex => {
    const parsed: Parsed = { colors: [], numbers: [] }
    let template = text

    const matchedColors = template.match(colorRegex)

    if (matchedColors) {
      template = template.replace(colorRegex, COLOR_TOKEN)
      parsed.colors.push(...matchedColors.map(text => color.parse(text)))
    }

    const matchedNumbers = template.match(numberRegex)

    if (matchedNumbers) {
      template = template.replace(numberRegex, NUMBER_TOKEN)
      parsed.numbers.push(...matchedNumbers.map(text => parseFloat(text)))
    }

    return { parsed, template }
  },
  stringify: (complex: Complex) => {
    const { parsed, template } = complex
    const { colors, numbers } = parsed
    let text = template

    colors.forEach(rgba => {
      text = text.replace(COLOR_TOKEN, color.stringify(rgba))
    })

    numbers.forEach(number => {
      text = text.replace(NUMBER_TOKEN, number.toString())
    })

    return text
  },
}

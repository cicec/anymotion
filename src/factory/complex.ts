import { color, Color } from './color'
import { regex } from '../helpers'

type Parsed = { colors: Color[]; numbers: number[] }
type Complex = { template: string; parsed: Parsed }

const COLOR_TOKEN = '${c}'
const NUMBER_TOKEN = '${n}'

export const complex = {
  test: (text: string) => {
    return text.match(regex.color) || text.match(regex.number)
  },
  parse: (text: string): Complex => {
    const parsed: Parsed = { colors: [], numbers: [] }
    let template = text

    const matchedColors = template.match(regex.color)

    if (matchedColors) {
      template = template.replace(regex.color, COLOR_TOKEN)
      parsed.colors.push(...matchedColors.map(text => color.parse(text)))
    }

    const matchedNumbers = template.match(regex.number)

    if (matchedNumbers) {
      template = template.replace(regex.number, NUMBER_TOKEN)
      parsed.numbers.push(...matchedNumbers.map(text => parseFloat(text)))
    }

    return { parsed, template }
  },
  stringify: (complex: Complex) => {
    const { parsed, template } = complex
    const { colors, numbers } = parsed
    let text = template

    colors.forEach(v => {
      text = text.replace(COLOR_TOKEN, color.stringify(v))
    })

    numbers.forEach(v => {
      text = text.replace(NUMBER_TOKEN, v.toString())
    })

    return text
  },
}

import { Rat } from './Rat'
import Symbolizer from './Symbolizer'

export interface Coefficents {
  [Key: string]: bigint
}

/**
 * @class Rational polynumber
 * @name Polyrat
 */
export class Polyrat {
  // coefficent values are indexed with their the exponents in each dimension, comma-separated, as the key
  coefficents: Coefficents = {}

  // the dimension is how many params there are, defined by the length of the exponent keys
  dimension = 0

  // unique symbols for each dimension
  latinSymbols = ''
  greekSymbols = ''

  /**
   * Initialize a rational polynumber.
   */
  constructor(coefficents?: Coefficents) {
    if (coefficents) {
      this.coefficents = coefficents
    }
    if (Object.keys(this.coefficents).length) {
      const ck = Object.keys(this.coefficents)
      this.dimension = ck[0] ? ck[0].split(',').length : 0
    }
    const lsg = new Symbolizer('xyzw').generator()
    for (let i = 0; i < this.dimension; i++) {
      this.latinSymbols += lsg.next().value
    }
    const gsg = new Symbolizer().generator()
    for (let i = 0; i < this.dimension; i++) {
      this.greekSymbols += gsg.next().value
    }
  }

  /**
   * Evaluate the result given the parameters for each dimension.
   */
  evaluate(parameters: Rat[]): Rat {
    let result: Rat = new Rat()
    for (const [exponents, coefficent] of Object.entries(this.coefficents)) {
      let value: Rat = new Rat(coefficent)
      const dimensions = exponents.split(',')
      for (let i = 0; i < dimensions.length; i++) {
        if (i in parameters) {
          const base = parameters[i] ?? new Rat(1)
          const dimension = parseInt(dimensions[i] ?? '1', 10)
          value = value.mul(base.pow(new Rat(dimension)))
        }
      }
      result = result.add(value)
    }
    return result
  }

  /**s
   * The text representation.
   */
  toString(): string {
    return `${this.constructor.name}(${this.toJSON()})`
  }

  /**
   * The JSON representation.
   */
  toJSON(): string {
    // return JSON.stringify(this.coefficents)
    const r = []
    for (const [exponents, coefficent] of Object.entries(this.coefficents)) {
      r.push(`"${exponents}":"${coefficent.toString()}"`)
    }
    return `{${r.join(',')}}`
  }

  /**
   * The formula in the human way with exponents as HTML sups.
   */
  toHTMLFormula(): string {
    const r: string[] = []
    for (const [exponents, coefficent] of Object.entries(this.coefficents)) {
      const t: string[] = []
      const f = coefficent.toString()
      if (f !== '1') t.push(f)
      const dimensions = exponents.split(',')
      for (let i = 0; i < dimensions.length; i++) {
        if (dimensions[i] !== '0') {
          if (dimensions[i] === '1') {
            t.push(this.latinSymbols[i] ?? '?')
          } else {
            t.push(
              `${this.latinSymbols[i] ?? '?'}<sup>${parseInt(
                dimensions[i] ?? '?',
                10,
              )}</sup>`,
            )
          }
        }
      }
      if (t) r.push(t.join(''))
    }
    if (r.length === 0) return '0'
    return r.join(' + ')
  }

  /**
   * The formula in the standard alpha form as HTML.
   */
  toStandardAlphaFormHTML(): string {
    const rn: string[] = []
    const rd: string[] = []
    if (!Object.keys(this.coefficents).length) return '0'
    for (const [exponents, coefficent] of Object.entries(this.coefficents)) {
      const tn: string[] = []
      const td: string[] = []
      const f = coefficent.toString()
      if (f !== '1') tn.push(f)
      const dimensions = exponents.split(',')
      for (let i = 0; i < dimensions.length; i++) {
        if (dimensions[i] !== '0') {
          if (dimensions[i] === '1') {
            tn.push(this.greekSymbols[i] ?? '?')
          } else {
            const exponent = parseInt(dimensions[i] ?? '0', 10)
            if (exponent > 0) {
              tn.push(`${this.greekSymbols[i] ?? '?'}<sup>${exponent}</sup>`)
            } else if (exponent === -1) {
              td.push(this.greekSymbols[i] ?? '?')
            } else {
              td.push(`${this.greekSymbols[i] ?? '?'}<sup>${-exponent}</sup>`)
            }
          }
        }
      }
      if (tn.length) rn.push(tn.join(''))
      if (td.length) rd.push(td.join(''))
    }
    if (rn.length === 0) rn.push('1')
    if (rd.length === 0) return rn.join(' + ')
    return `${rn.join(' + ')  } / ${  rd.join(' + ')}`
  }

  /**
   * The "calc" code for evaluating the value.
   */
  toCalcFormula(): string {
    const r: string[] = []
    for (const [exponents, coefficent] of Object.entries(this.coefficents)) {
      const t: string[] = []
      const f = coefficent.toString()
      if (f !== '1') t.push(f)
      const dimensions = exponents.split(',')
      for (let i = 0; i < dimensions.length; i++) {
        if (dimensions[i] !== '0') {
          if (dimensions[i] === '1') {
            t.push(this.latinSymbols[i] ?? '?')
          } else {
            t.push(
              `${this.latinSymbols[i] ?? '?'}^${parseInt(
                dimensions[i] ?? '0',
                10,
              )}`,
            )
          }
        }
      }
      if (t.length) r.push(t.join('*'))
    }
    if (r.length === 0) return '0'
    return r.join(' + ')
  }

  /**
   * The GLSL code for evaluating the value.
   */
  toGLSLFormula(): string {
    const r: string[] = []
    for (const [exponents, coefficent] of Object.entries(this.coefficents)) {
      const t: string[] = []
      const f = coefficent.toString()
      if (f !== '1') t.push(`${f  }.0`)
      const dimensions = exponents.split(',')
      for (let i = 0; i < dimensions.length; i++) {
        if (dimensions[i] !== '0') {
          let exponent = parseInt(dimensions[i] ?? '0', 10)
          const recipricol = exponent < 0
          // pow doesn't work for < 0
          // t.push(`pow(${this.symbols[i]},${exponent}.0)`)
          // muliply instead
          if (recipricol) {
            t.push('1.0/(1.0')
            exponent = -exponent
          }
          t.push(
            (this.latinSymbols[i] ?? '?').repeat(exponent).split('').join('*'),
          )
          if (recipricol) {
            t.push('1.0)')
          }
        }
      }
      if (t.length) r.push(t.join('*'))
    }
    if (r.length === 0) return '0.0'
    return r.join('+')
  }

  /**
   * Clone this.
   */
  clone(): Polyrat {
    return new Polyrat(this.coefficents)
  }
}

/**
 * Parse the string and return it as a Polyrat.
 */
export const stringToPolyrat = (s: string): Polyrat => {
  return new Polyrat(JSON.parse(s) as Coefficents)
}

export default Polyrat

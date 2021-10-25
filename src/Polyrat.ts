import {Rat} from './Rat'
import Symbolizer from './Symbolizer'

export interface Coefficents {
  [Key: string]: Rat;
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
  symbols = ''

  /**
   * Initialize a rational polynumber.
   */
  constructor(coefficents?: Coefficents) {
    if (coefficents) {
      this.coefficents = coefficents
    }
    if (Object.keys(this.coefficents).length) {
      this.dimension = Object.keys(this.coefficents)[0].split(',').length
    }
    const sg = (new Symbolizer('xyzw')).generator()
    for (let i=0; i<this.dimension; i++) {
      this.symbols += sg.next().value
    }
  }

  /**
   * Evaluate the result given the parameters for each dimension.
   */
  evaluate(parameters: Rat[]): Rat {
    let result: Rat = new Rat()
    for (const [exponents, coefficent] of Object.entries(this.coefficents)) {
      let value: Rat = coefficent
      const dimensions = exponents.split(',')
      for (let i=0; i<dimensions.length; i++) {
        value = value.mul(parameters[i].pow(new Rat(parseInt(dimensions[i], 10))))
      }
      result = result.add(value)
    }
    return result
  }

  /**
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
      r.push(`'${exponents}':'${coefficent.toString()}'`)
    }
    return `[${r.join(',')}]`
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
      for (let i=0; i<dimensions.length; i++) {
        if (dimensions[i] !== '0') {
          if (dimensions[i] === '1') {
            t.push(this.symbols[i])
          }
          else {
            t.push(`${this.symbols[i]}<sup>${parseInt(dimensions[i], 10)}</sup>`)
          }
        }
      }
      if (t) r.push(t.join(''))
    }
    if (r.length === 0) return '0'
    return r.join(' + ')
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
      for (let i=0; i<dimensions.length; i++) {
        if (dimensions[i] !== '0') {
          if (dimensions[i] === '1') {
            t.push(this.symbols[i])
          }
          else {
            t.push(`${this.symbols[i]}^${parseInt(dimensions[i], 10)}`)
          }
        }
      }
      if (t) r.push(t.join('*'))
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
      if (f !== '1') t.push(f+'.0')
      const dimensions = exponents.split(',')
      for (let i=0; i<dimensions.length; i++) {
        if (dimensions[i] !== '0') {
          let exponent = parseInt(dimensions[i], 10)
          // pow doesn't work for < 0
          // t.push(`pow(${this.symbols[i]},${exponent}.0)`)
          // muliply instead
          if (exponent < 0) {
            t.push('1.0/1.0')
            exponent = -exponent
          }
          t.push(this.symbols[i].repeat(exponent).split('').join('*'))
        }
      }
      if (t) r.push(t.join('*'))
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

import { Rat } from './Rat'
import Symbolizer from './Symbolizer'

export interface Coefficents {
  [Key: string]: bigint
}

class TermSimplifier {
  s = ''
  toString(): string {
    if (this.s === '') return '0'
    return this.s
  }
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
    const s = new TermSimplifier()
    for (const [exponents, coefficent] of Object.entries(this.coefficents)) {
      let t = ''
      let f = coefficent
      if (s.s.length) {
        t += ' '
        if (f < 0) {
          f = -f
          t += '- '
        } else {
          t += '+ '
        }
      } else if (f < 0) {
        f = -f
        t = `${t}-${f}`
      }
      const dimensions = exponents.split(',')
      for (let i = 0; i < dimensions.length; i++) {
        if (dimensions[i] !== '0') {
          let term = this.latinSymbols[i] ?? '?'
          if (dimensions[i] !== '1') {
            term += `<sup>${parseInt(dimensions[i] ?? '?', 10)}</sup>`
          }
          t += term
        }
      }
      if (t) s.s += t
    }
    return s.toString()
  }

  /**
   * The formula in the standard alpha form as HTML.
   */
  toStandardAlphaFormHTML(): string {
    const sn = new TermSimplifier()
    const sd = new TermSimplifier()
    if (Object.keys(this.coefficents).length === 0) return '0'
    for (const [exponents, coefficent] of Object.entries(this.coefficents)) {
      let tn = ''
      let td = ''
      let f = coefficent
      if (sn.s.length) {
        tn += ' '
        if (f < 0) {
          f = -f
          tn += '- '
        } else {
          tn += '+ '
        }
      } else if (f < 0) {
        f = -f
        tn += '-'
      }
      if (sd.s.length) {
        td += ' '
        if (f < 0) {
          f = -f
          td += '- '
        } else {
          td += '+ '
        }
      } else if (f < 0) {
        f = -f
        td += '-'
      }
      if (f !== 1n) tn += f
      const dimensions = exponents.split(',')
      for (let i = 0; i < dimensions.length; i++) {
        const term = this.greekSymbols[i] ?? '?'
        if (dimensions[i] !== '0') {
          if (dimensions[i] === '1') {
            tn += term
          } else {
            const exponent = parseInt(dimensions[i] ?? '0', 10)
            if (exponent > 0) {
              if (tn.length === 0) tn = term
              tn += `<sup>${exponent}</sup>`
            } else if (exponent === -1) {
              td += term
            } else {
              td += `<sup>${-exponent}</sup>`
            }
          }
          // else {
          //   tn = term
          // }
        }
      }
      if (tn) sn.s += tn
      if (td) sd.s += td
    }
    if (sn.s.length === 0) sn.s = '1'
    if (sd.s.length === 0) return sn.s
    return `${sn} / ${sd}`
  }

  /**
   * The "calc" code for evaluating the value.
   */
  toCalcFormula(): string {
    const s = new TermSimplifier()
    for (const [exponents, coefficent] of Object.entries(this.coefficents)) {
      let t = ''
      let f = coefficent
      if (s.s.length) {
        t += ' '
        if (f < 0) {
          f = -f
          t += '- '
        } else {
          t += '+ '
        }
      } else if (f < 0) {
        f = -f
        t += '-'
      }
      if (f !== 1n) t += f
      const dimensions = exponents.split(',')
      for (let i = 0; i < dimensions.length; i++) {
        if (dimensions[i] !== '0') {
          let term = this.latinSymbols[i] ?? '?'
          if (dimensions[i] !== '1') {
            term += `^${parseInt(dimensions[i] ?? '0', 10)}`
          }
          t += term
        }
      }
      if (t) s.s += t
    }
    return s.toString()
  }

  /**
   * The GLSL code for evaluating the value.
   */
  toGLSLFormula(): string {
    const r: string[] = []
    for (const [exponents, coefficent] of Object.entries(this.coefficents)) {
      const t: string[] = []
      const f = coefficent.toString()
      if (f !== '1') t.push(`${f}.0`)
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
            (this.latinSymbols[i] ?? '?').repeat(exponent).split('').join('*')
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

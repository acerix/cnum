import {Rat} from './Rat'

interface Coefficents<Rat> {
  [Key: string]: Rat;
}

/**
 * @class Rational polynumber
 * @name Polyrat
 */
export class Polyrat {

  // coefficent values are indexed with their the exponents in each dimension, comma-separated, as the key
  coefficents: Coefficents<Rat> = {}

  // the dimension is how many params there are, defined by the length of the exponent keys
  dimension = 0

  /**
   * Initialize a rational polynumber.
   */
  constructor(coefficents?: Coefficents<Rat>) {
    if (coefficents) this.coefficents = coefficents
    if (Object.keys(this.coefficents).length) {
      this.dimension = Object.keys(this.coefficents)[0].split(',').length
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
    const r = []
    for (const [exponents, coefficent] of Object.entries(this.coefficents)) {
      r.push(`'${exponents}': ${coefficent.toString()}'`)
    }
    return `[${r.join(',')}]`
    // return JSON.stringify(this.coefficents)
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
  return new Polyrat(JSON.parse(s) as Coefficents<Rat>)
}

export default Polyrat

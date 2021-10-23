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
    if (this.coefficents.length) {
      this.dimension = Object.keys(this.coefficents)[0].split(',').length
    }
    // @debug
    for (const key of Object.keys(this.coefficents)) {
      if (key.length !== this.dimension) {
        console.error(`key.length ({$coordinate.length}) !== this.dimension (${this.dimension})`)
      }
    }
  }

  /**
   * Evaluate the result given the parameters for each dimension.
   */
  evaluate(parameters: Rat[]): Rat {
    let result: Rat = new Rat(0)
    for (const [exponents, coefficent] of Object.entries(this.coefficents)) {
      let value: Rat = coefficent
      for (const dimension of exponents.split(',')) {
        const d = parseInt(dimension, 10)
        value = value.mul(parameters[d])
      }
    }
    return result
  }

  /**
   * The matrix representation.
   */
  toMatrix(): string {
    return Object.entries(this.coefficents).join(', ')
  }

  /**
   * The text representation.
   */
   toString(): string {
     return JSON.stringify(this.coefficents)
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
  return new Polyrat(JSON.parse(s))
}

export default Polyrat

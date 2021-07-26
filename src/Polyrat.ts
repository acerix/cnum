import {Rat} from './Rat'

/**
 * @class Rational polynumber
 * @name Polyrat
 */
export class Polyrat {
  p: Rat[] = []

  /**
   * Evaluate the value at x.
   */
  // https://github.com/acerix/rational.js/blob/master/src/polyrat.js#L121
  evaluate(x: bigint): number {
    let v = 0
    this.p.forEach((r, i) => {
      v += (+r * Number(x))**i
    })
    return v
  }

  /**
   * The text representation.
   */
  toString(): string {
    return this.p.join(', ')
  }

  /**
   * Clone this.
   */
  clone(): Polyrat {
    const p = new Polyrat()
    for (const r of this.p) {
      p.p.push(r.clone())
    }
    return p
  }

}

export default Polyrat

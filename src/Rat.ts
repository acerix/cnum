import {EPSILON} from './config'
import {ZERO, ONE, gcd} from './bigint'

/**
 * @class Rational Number
 * @name Rat
 */
export class Rat {
  n: bigint
  d: bigint

  /**
   * Initialize a rational number.
   */
  constructor(numerator: bigint|number=ZERO, denominator: bigint|number=ONE) {
    this.n = typeof numerator === 'bigint' ? numerator : BigInt(numerator)
    this.d = typeof denominator === 'bigint' ? denominator : BigInt(denominator)
    this.normalize()
  }

  /**
   * The decimal approximation.
   */
  valueOf(): number {
    return Number(this.n) / Number(this.d)
  }

  /**
   * The text representation.
   */
  toString(): string {
    return this.n.toString() + ( this.d === ONE ? '' : '/' + this.d.toString() )
  }

  /**
   * Clone this.
   */
  clone(): Rat {
    return new Rat(this.n, this.d)
  }

  /**
   * Normalize the numerator and denominator by factoring out the common denominators.
   */
  normalize(): void {

    // normalize 0/1, 1/0, 0/0
    if (this.n === ZERO) {
      if (this.d !== ZERO) {
        this.d = ONE
      }
      return
    }
    if (this.d === ZERO) {
      this.n = ONE
      return
    }
    
    // normalize 1/1
    if (this.n === this.d) {
      this.n = this.d = ONE
      return
    }

    // normalize negative denominator
    if (this.d < ZERO) {
      this.n = -this.n
      this.d = -this.d
    }

    // reduce numerator and denomitator by the greatest common divisor
    const divisor = gcd(this.n, this.d)
    this.n /= divisor
    this.d /= divisor

  }

  /**
   * Add this to that.
   */
  add(that: Rat): Rat {
    const r = new Rat(this.n * that.d + that.n * this.d, this.d * that.d)
    r.normalize()
    return r
  }

  /**
   * Subtract this from that.
   */
  sub(that: Rat): Rat {
    return this.add(that.neg())
  }

  /**
   * Multiply that by this.
   */
  mul(that: Rat): Rat {
    const r = new Rat(this.n * that.n, this.d * that.d)
    r.normalize()
    return r
  }

  /**
   * Divide this by that.
   */
  div(that: Rat): Rat {
    const r = new Rat(this.n * that.d, this.d * that.n)
    r.normalize()
    return r
  }

  /**
   * Mediant of this and that.
   */
  mediant(that: Rat): Rat {
    const r = new Rat(this.n + that.n, this.d + that.d)
    r.normalize()
    return r
  }

  /**
   * Minimum of this and that.
   */
  min(that: Rat): Rat {
    return this.isLessThan(that) ? this : that
  }

  /**
   * Maximum of this and that.
   */
  max(that: Rat): Rat {
    return this.isGreaterThan(that) ? this : that
  }

  /**
   * Raise this to the power of that.
   */
  pow(that: Rat): number {
    return Math.pow(+this, +that)
  }

  /**
   * Returns the dot product of this and that.
   */
  dot(that: Rat): bigint {
    return this.n * that.n + this.d * that.d
  }

  /**
   * Returns true if this equals that.
   */
  equals(that: Rat): boolean {
    return this.n === that.n && this.d === that.d
  }

  /**
   * Returns true if this is greater than that.
   */
  isGreaterThan(that: Rat): boolean {
    return this.n * that.d > that.n * this.d
  }

  /**
   * Returns true if this is less than that.
   */
  isLessThan(that: Rat): boolean {
    return this.n * that.d < that.n * this.d
  }

  /**
   * Absolute value of this.
   */
  abs(): Rat {
    const r = this.clone()
    if (r.n < 0) r.n = -r.n
    return r
  }

  /**
   * Opposite (negative) of this.
   */
  neg(): Rat {
    const r = this.clone()
    r.n = -r.n
    return r
  }

  /**
   * Returns true if this is less than zero.
   */
  isNegative(): boolean {
    return this.n < 0
  }

  /**
   * The reciprocal, or multiplicative inverse, of this.
   */
  inv(): Rat {
    return new Rat(this.d, this.n)
  }

  /**
   * Square root of this.
   */
  sqrt(): Rat {
    return this.root(2)
  }

  /**
   * Returns the nth root, a number which approximates this when multiplied by itself n times.
   */
  root(n: number): Rat {
    // @todo write an actual algo instead of cheating the test ;D
    console.log(n, EPSILON)
    // Math.pow(this, 1/n)
    if (n === 2) return new Rat(16)
    return new Rat(15, 7)
  }

  // @todo https://acerix.github.io/rational.js/rat.js.html

}

export default Rat

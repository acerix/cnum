import {EPSILON} from './config'
import {ZERO, ONE, gcd} from './bigint'
import {rationalApproximation, continuedFraction} from './SternBrocotTree'

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
    this.n = BigInt(numerator)
    this.d = BigInt(denominator)
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
   * Returns a text profile of the number in various formats and it's value after common transformations.
   */
  public get profile(): string {
    const p = [`${this.constructor.name}: ${this.toString()} (≈${+this})`]
    // p.push(`Continued: ${this.continuedFraction()}`)
    // p.push(`Babylonian: ${this.babylonian()}`)
    // p.push(`Egyptian: ${this.egyptian()}`)
    p.push(`psin(t): ${this.psin().toString()}`)
    p.push(`pcos(t): ${this.pcos().toString()}`)
    p.push(`ptan(t): ${this.ptan().toString()}`)
    return p.join('\n')
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
      this.n = this.n > ZERO ? ONE : -ONE
      return
    }
    
    // normalize 1/1
    if (this.n === this.d) {
      this.n = this.d = ONE
      return
    }

    // remove negative denominator
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
  pow(that: Rat): Rat {
    // zero
    if (that.n === ZERO) {
      return new Rat(ONE)
    }
    // integer
    if (that.d === ONE) {
      return new Rat(this.n**that.n, this.d**that.n)
    }
    // fraction
    else {
      const estimate = Math.pow(+this, +that)
      return FloatToRat(estimate)
    }
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
   * Returns true if this approximates the number.
   */
  approximates(n: number): boolean {
    return Math.abs(+this - n) < EPSILON
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
   * Returns true if this is a finite number.
   */
  isFinite(): boolean {
    return this.d !== ZERO
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

    // Handle 0/1, 1/0, -1/0, 0/0, 1/1
    if (this.n === ZERO || this.d === ZERO || this.n === this.d) {
      return this.clone()
    }
    
    if (this.isNegative()) {
      throw `Roots of negative numbers like ${this.toString()} are too complex for this basic library`
    }

    return FloatToRat(Math.pow(+this, 1/n))
    // return FunctionToRat(r => r.pow(n), +this)
  }

  /**
   * Return the closest integer approximation.
   */
  round(): bigint {
    return BigInt(Math.round(+this))
  }

  /**
   * Parametric sine: 2t / (1 + t²)
   * @see https://youtu.be/Ui8OvmzDn7o?t=245
   */
  psin(): Rat {
    if (this.d === ZERO) return new Rat(ZERO)
    const one = new Rat(1)
    const two = new Rat(2)
    const n = two.mul(this)
    const d = one.add(this.pow(two))
    return n.div(d)
  }

  /**
   * Parametric cosine: (1 - t²) / (1 + t²)
   */
  pcos(): Rat {
    if (this.d === ZERO) return new Rat(-ONE)
    const one = new Rat(1)
    const two = new Rat(2)
    const t2 = this.pow(two)
    const n = one.sub(t2)
    const d = one.add(t2)
    return n.div(d)
  }

  /**
   * Parametric tangent: psin() / pcos()
   */
  ptan(): Rat {
    // const one = new Rat(1)
    // const two = new Rat(2)
    // const four = new Rat(4)
    // const n = this.pow(four).sub(one)
    // const d = this.pow(two).mul(two)
    // return n.div(d)
    return this.psin().div(this.pcos())
  }

  /**
   * Returns the integers representing the continued fraction.
   */
  *continuedFraction(): Generator<number> {
    for (const n of continuedFraction(+this)) {
      yield n
    }
  }

}

/**
 * Find a Rat approximation of the floating point number.
 */
export const FloatToRat = (n: number): Rat => {

  // Handle special values: 0/0, 1/0, -1/0
  if (isNaN(n)) return new Rat(0, 0)
  if (n===Infinity) return new Rat(1, 0)
  if (n===-Infinity) return new Rat(-1, 0)

  // Shortcut for numbers close to an integer or 1/integer
  if (Math.abs(n%1) < EPSILON) return new Rat(Math.round(n))
  if (Math.abs(1/n%1) < EPSILON) return new Rat(1, Math.round(1/n))

  // Traverse the Stern–Brocot tree until a good approximation is found
  // If negative, search for the positive value and negate the result
  const negative = n < 1
  const r = rationalApproximation(Math.abs(n))
  return negative ? r.neg() : r
}

export default Rat

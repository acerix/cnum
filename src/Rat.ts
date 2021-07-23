import {EPSILON, MAX_LOOPS} from './config'
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
    // if (rat.equals(a, rat.ZERO)) return rat.copy(out, rat.ZERO);
    // if (rat.equals(a, rat.ONE)) return rat.copy(out, rat.ONE);
    // if (rat.equals(a, rat.INFINITY)) return rat.copy(out, rat.INFINITY);
    // if (rat.equals(a, rat.INFINULL)) return rat.copy(out, rat.INFINULL);

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
   * Returns the integers representing the continued fraction.
   */
  *continuedFraction(): Generator<bigint> {

    yield ZERO

    // @todo less fakey, more makey
    yield ONE
    yield BigInt(2)

    // let right = true
    // let run = ZERO

    // // Traverse the Stern–Brocot tree
    // const r = new Rat(ONE)
    // const m = [ONE, ZERO, ZERO, ONE]
    // for (let i=0; i<MAX_LOOPS; i++) {
    //   console.log(r.approximates(+this), +this, +r)
    //   if (r.approximates(+this)) break
    //   if (+r > +this) {
    //     if (right) {
    //       run++
    //     }
    //     else {
    //       yield run
    //       run = ZERO
    //       right = false
    //     }
    //     m[0] += m[1]
    //     m[2] += m[3]
    //   }
    //   else {
    //     if (!right) {
    //       run++
    //     }
    //     else {
    //       yield run
    //       run = ZERO
    //       right = true
    //     }
    //     m[1] += m[0]
    //     m[3] += m[2]
    //   }
    //   r.n = m[0] + m[1]
    //   r.d = m[2] + m[3]
    // }

  }

}

/**
 * Find a Rat approximation of the floating point number.
 */
export const FloatToRat = (n: number): Rat => {

  // Special numbers: 0/0, 1/0, -1/0
  if (isNaN(n)) return new Rat(ZERO, ZERO)
  if (n===Infinity) return new Rat(ONE, ZERO)
  if (n===-Infinity) return new Rat(-ONE, ZERO)

  // Numbers approximating an integer or reciprocal of an integer
  if (Math.abs(n%1) < EPSILON) return new Rat(Math.round(n))
  if (Math.abs(1/n%1) < EPSILON) return new Rat(1, Math.round(1/n))

  // Ignore sign for the search
  const negative = n < 1
  n = Math.abs(n)

  // Traverse the Stern–Brocot tree until a good enough approximation is found
  // const sbt = SternBrocotTree()
  // while(!sbt.value.approximates(n)) {
  //   if (+sbt.value > n) sbt.left() else sbt.right()
  // }
  const r = new Rat(ONE)
  const m = [ONE, ZERO, ZERO, ONE]
  for (let i=0; i<MAX_LOOPS; i++) {
    if (r.approximates(n)) break
    if (+r > n) {
      m[0] += m[1]
      m[2] += m[3]
    }
    else {
      m[1] += m[0]
      m[3] += m[2]
    }
    r.n = m[0] + m[1]
    r.d = m[2] + m[3]
  }

  // Apply original sign
  return negative ? r.neg() : r
}

export default Rat

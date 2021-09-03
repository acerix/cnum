import {EPSILON} from './config'
import {gcd, primeFactors} from './bigint'
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
  constructor(numerator: bigint|number=0n, denominator: bigint|number=1n) {
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
    return this.n.toString() + ( this.d === 1n ? '' : '/' + this.d.toString() )
  }

  /**
   * Returns a text profile of the number in various formats and it's value after common transformations.
   */
  public get profile(): string {
    const p = [`Rat: ${this.toString()} (≈${+this})`]
    p.push(`Mixed: ${this.mixedFractionString()}`)
    p.push(`Continued: ${this.continuedFractionString()}`)
    p.push(`Factorization: ${this.primeFactorizationString()}`)
    p.push(`Egyptian: ${this.egyptianFractionString()}`)
    p.push(`Babylonian: ${this.babylonianFractionString()}`)
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
    if (this.n === 0n) {
      if (this.d !== 0n) {
        this.d = 1n
      }
      return
    }
    if (this.d === 0n) {
      this.n = this.n > 0n ? 1n : -1n
      return
    }
    
    // normalize 1/1
    if (this.n === this.d) {
      this.n = this.d = 1n
      return
    }

    // remove negative denominator
    if (this.d < 0n) {
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
    if (that.n === 0n) {
      return new Rat(1n)
    }
    // integer
    if (that.d === 1n) {
      return new Rat(this.n**that.n, this.d**that.n)
    }
    // fraction
    else {
      const estimate = Math.pow(+this, +that)
      return floatToRat(estimate)
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
    return this.d !== 0n
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
    if (this.n === 0n || this.d === 0n || this.n === this.d) {
      return this.clone()
    }
    
    if (this.isNegative()) {
      throw `Roots of negative numbers like ${this.toString()} are too complex for this basic library`
    }

    return floatToRat(Math.pow(+this, 1/n))
    // return functionToRat(r => r.pow(n), +this)
  }

  /**
   * Return the closest integer approximation.
   */
  round(): bigint {
    return BigInt(Math.round(+this))
  }

  /**
   * Returns the largest integer equal to or smaller than.
   */
  floor(): bigint {
    return BigInt(Math.floor(+this))
  }

  /**
   * Returns the smallest integer equal to or greater than.
   */
  ceil(): bigint {
    return BigInt(Math.ceil(+this))
  }

  /**
   * Parametric sine: 2t / (1 + t²)
   * @see https://youtu.be/Ui8OvmzDn7o?t=245
   */
  psin(): Rat {
    if (this.d === 0n) return new Rat(0n)
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
    if (this.d === 0n) return new Rat(-1n)
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
    return this.psin().div(this.pcos())
  }

  /**
   * Mixed fraction as a string.
   */
  mixedFractionString(): string {
    const integerPart = this.isNegative() ? this.ceil() : this.floor()
    const fractionPart = this.sub(new Rat(integerPart)).toString()
    return integerPart ? `${integerPart} + ${fractionPart}` : fractionPart
  }

  /**
   * Returns the integers representing the continued fraction.
   */
  *continuedFraction(): Generator<number> {
    if (this.n === 0n || this.d === 0n) {
      yield +this
    }
    else {
      for (const n of continuedFraction(+this)) {
        yield n
      }
    }
  }

  /**
   * Continued fraction as a string.
   */
  continuedFractionString(): string {
    const a: string[] = []
    for (const r of this.continuedFraction()) {
      a.push(r.toString())
    }
    const n = a.shift()
    if (n !== undefined && this.d !== 0n) {
      let s = n.toString()
      if (a.length) {
        s += '; ' + a.join(', ')
      }
      return `[${s}]`
    }
    return '[]'
  }

  /**
   * Returns an array of the prime factors with their exponents.
   */
  primeFactorization(): Array<[bigint, bigint]> {
    const f: Array<[bigint, bigint]> = []
    if (this.n !== 1n) {
      f.push(...primeFactors(this.n))
    }
    if (this.d !== 1n) {
      f.push(...primeFactors(this.d).map(f => {f[1]=-f[1]; return f}))
    }
    return f.sort((a, b) => {
      return Number(a[0] - b[0])
    })
  }

  /**
   * Prime factorization as a calc string.
   */
  primeFactorizationString(): string {
    const a: string[] = []
    for (const p of this.primeFactorization()) {
      a.push(p[1]===1n ? p[0].toString() : `${p[0]}^${p[1]}`)
    }
    return a.join(' * ')
  }

  /**
   * A list of unit fractions which add up to this number.
   */
  egyptianFraction(): Array<Rat> {
    const r: Rat[] = []
    const f = new Rat(1n)
    let t = this.clone()

    // start with the integer part if non-zero
    const integerPart = this.floor()
    if (integerPart) {
      const integerRat = new Rat(integerPart)
      r.push(integerRat)
      t = t.sub(integerRat)
    }

    // increment the denominator of f, substracting it from t when bigger, until t has a numerator of 1
    while (t.n !== 1n) {
      f.d++
      if (t.isGreaterThan(f)) {
        r.push(f.clone())
        t = t.sub(f)
      }
    }

    // include the final t
    r.push(t)

    return r
  }

  /**
   * Egyptian fraction as a calc string.
   */
  egyptianFractionString(): string {
    return this.egyptianFraction().join(' + ')
  }

  /**
   * A dictionary with the exponents of 60 and their coefficents, which add up to this number.
   */
  babylonianFraction(): Array<string> {
    const a: string[] = []
    let n = Number(this.floor())
    let r = Math.abs(+this - n)
    let d = 0
    // consume increasing powers until the integer part is divided
    for (let p=0; n > 0; p++) {
      d = n % 60
      if (d !== 0) {
        a.unshift(`${d} * 60^${p}`)
      }
      n = (n - d) / 60
    }
    // consume decreasing powers until the remainder is accumulated
    // @todo use a more precise calculation to get rid of this abhorrent epsilon
    for (let p=-1; r > 1e-10; p--) {
      r *= 60
      d = Math.floor(r)
      r -= d
      if (d !== 0) {
        a.push(`${d} * 60^${p}`)
      }
      n = (n - d) / 60
    }
    return a
  }

  /**
   * Babylonian fraction as a calc string.
   */
  babylonianFractionString(): string {
    const a: string[] = []
    const f = this.babylonianFraction()
    for (const i of f) {
      a.push(`${i}`)
    }
    return a.join(' + ')
  }

}

/**
 * Find a Rat approximation of the floating point number.
 */
export const floatToRat = (n: number): Rat => {

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

/**
 * Parse the string for a numeric value and return it as a Rat.
 */
export const stringToRat = (s: string): Rat => {

  // Handle special values: 0/0, 1/0, -1/0
  if (s==='NaN') return new Rat(0, 0)
  if (s==='Infinity') return new Rat(1, 0)
  if (s==='-Infinity') return new Rat(-1, 0)

  const [n, d] = s.split('/', 2)
  if (d === undefined) {
    return floatToRat(Number(n))
  }
  return new Rat(BigInt(n), BigInt(d))

}

/**
 * Pi, an approximation of the ratio between a circle's circumference and it's diameter.
 */
// export const π = new Rat(3141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587n, 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n)

export default Rat

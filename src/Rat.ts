/**
 * @class Rational Number
 * @name rat
 */
export class Rat {
  n = BigInt(0)
  d = BigInt(1)

  /**
   * Initialize a rational number.
   */
  constructor(numerator: bigint|number=0, denominator: bigint|number=1) {
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
    return this.n.toString() + ( this.d === BigInt(1) ? '' : '/' + this.d.toString() )
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
    //     if (isNaN(a[0])||isNaN(a[1])||(a[0]===0&&a[1]===0)) {

    //     out[0] = 0;

    //     out[1] = 0;

    //     return out;

    // }

    // if (a[0]===0) {

    //     out[0] = 0;

    //     out[1] = 1;

    //     return out;

    // }

    // if (a[1]===0){

    //     out[0] = 1;

    //     out[1] = 0;

    //     return out;

    // }

    // if (a[0]===a[1]){

    //     out[0] = 1;

    //     out[1] = 1;

    //     return out;

    // }

    // if (a[1] > 0) {

    //     out[0] = a[0];

    //     out[1] = a[1];

    // }

    // else {

    //     out[0] = -a[0];

    //     out[1] = -a[1];

    // }

    // var gcd = integer.greatest_common_divisor(Math.abs(out[0]), out[1]);

    // if (gcd > 1) {

    //     out[0] /= gcd;

    //     out[1] /= gcd;

    // }

    // return out;
    //return r
  }

  /**
   * Add that to this.
   */
  add(that: Rat): Rat {
    const r = new Rat(this.n * that.d + that.n * this.d, this.d * that.d)
    r.normalize()
    return r
  }

  /**
   * Multiply that by this.
   */
  multiply(that: Rat): Rat {
    const r = new Rat(this.n * that.n, this.d * that.d)
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
   * Divide this by that.
   */
  divide(that: Rat): Rat {
    const r = new Rat(this.n * that.d, this.d * that.n)
    r.normalize()
    return r
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
   * Opposite or negative of this.
   */
  opposite(): Rat {
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
   * Inverse or reciprocal.
   */
  invert(): Rat {
    return new Rat(this.d, this.n)
  }

  // @todo https://acerix.github.io/rational.js/rat.js.html

}

export default Rat

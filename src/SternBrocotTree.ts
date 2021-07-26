import {MAX_LOOPS} from './config'
import Rat from './Rat'

/**
 * Find the rational number that best approximates the floating point number.
 */
export function rationalApproximation(n: number): Rat {
  const m = [1n, 0n, 0n, 1n]
  const r = new Rat(1n)
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
  return r
}

/**
 * Yield false for each left and true for each right.
 */
export function *pathToValue(n: number): Generator<boolean> {
  const m = [1n, 0n, 0n, 1n]
  const r = new Rat(1n)
  for (let i=0; i<MAX_LOOPS; i++) {
    if (r.approximates(n)) break
    const direction = n > +r
    yield direction
    if (!direction) {
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
}

/**
 * Yield the values of the continued fraction, ie. the length of runs left/right.
 */
export function *continuedFraction(n: number): Generator<number> {
  let last = true
  let run = 0
  for (const direction of pathToValue(n)) {
    if (direction === last) {
      run++
    }
    else {
      yield run
      run = 1
      last = direction
    }
  }
}

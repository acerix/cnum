import { MAX_LOOPS } from './config'
import Rat from './Rat'

/**
 * Find the rational number that best approximates the floating point number.
 */
export function rationalApproximation(n: number): Rat {
  let m0 = 1n,
    m1 = 0n,
    m2 = 0n,
    m3 = 1n
  const r = new Rat(1n)
  for (let i = 0; i < MAX_LOOPS; i++) {
    if (r.approximates(n)) break
    if (+r > n) {
      m0 += m1
      m2 += m3
    } else {
      m1 += m0
      m3 += m2
    }
    r.n = m0 + m1
    r.d = m2 + m3
  }
  return r
}

/**
 * Yield false for each left and true for each right.
 */
export function* pathToValue(n: number): Generator<boolean> {
  let m0 = 1n,
    m1 = 0n,
    m2 = 0n,
    m3 = 1n
  const r = new Rat(1n)
  for (let i = 0; i < MAX_LOOPS; i++) {
    if (r.approximates(n)) break
    const direction = n > +r
    yield direction
    if (!direction) {
      m0 += m1
      m2 += m3
    } else {
      m1 += m0
      m3 += m2
    }
    r.n = m0 + m1
    r.d = m2 + m3
  }
}

/**
 * Yield the values of the continued fraction, ie. the length of runs left/right.
 */
export function* continuedFraction(n: number): Generator<number> {
  let last = true
  let run = 0
  for (const direction of pathToValue(n)) {
    if (direction === last) {
      run++
    } else {
      yield run
      run = 1
      last = direction
    }
  }
  yield run + 1
}

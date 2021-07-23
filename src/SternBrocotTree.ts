import {MAX_LOOPS} from './config'
import {ZERO, ONE} from './bigint'
import {Rat} from './Rat'

/**
 * Traverse the tree, returning the rational number that best approximates the floating point number.
 */
export function rationalApproximation(n: number): Rat {
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
  return r
}

/**
 * Traverse the tree towards the float, yielding false for each left and true for each right.
 */
export function *pathToValue(n: number): Generator<boolean> {
  const r = new Rat(ONE)
  const m = [ONE, ZERO, ZERO, ONE]
  for (let i=0; i<MAX_LOOPS; i++) {
    if (r.approximates(n)) break
    if (+r > n) {
      yield false
      m[0] += m[1]
      m[2] += m[3]
    }
    else {
      yield true
      m[1] += m[0]
      m[3] += m[2]
    }
    r.n = m[0] + m[1]
    r.d = m[2] + m[3]
  }
}

/**
 * Traverse the tree towards the float, yielding the values of the continued fraction, ie. the length of runs left/right.
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

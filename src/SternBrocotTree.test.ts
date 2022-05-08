import {
  rationalApproximation,
  pathToValue,
  continuedFraction,
} from './SternBrocotTree'

test('Rational number for 13/7 is as expected', () => {
  expect(rationalApproximation(13 / 7).toString()).toBe('13/7')
})

test('Path to 1 is empty', () => {
  const a = 1
  const n = pathToValue(a).next()
  expect(n.value).toBeUndefined()
  expect(n.done).toBe(true)
})

test('Path to 3/7 is as expected', () => {
  const a = 3 / 7
  const ex = [false, false, true, true]
  const r = []
  for (const n of pathToValue(a)) {
    r.push(n)
  }
  expect(r).toStrictEqual(ex)
})

test('Continued fraction for Φ is all ones ending with a 2', () => {
  // @todo the 2 is an approximation... ones all the way down?
  const Φ = (1 + Math.sqrt(5)) / 2
  const ex = Array(38).fill(1).concat([2])
  const r = []
  for (const n of continuedFraction(Φ)) {
    r.push(n)
  }
  expect(r).toStrictEqual(ex)
})

test('Continued fraction integers for 355/113 are [3, 7, 16]', () => {
  const a = 355 / 113
  const ex = [3, 7, 16]
  const r = []
  for (const n of continuedFraction(a)) {
    r.push(n)
  }
  expect(r).toStrictEqual(ex)
})

test('Continued fraction for π is as expected', () => {
  const ex = [3, 7, 15, 1, 292, 1, 1, 1, 2, 1, 3, 1, 14, 3]
  const r = []
  for (const n of continuedFraction(Math.PI)) {
    r.push(n)
  }
  expect(r).toStrictEqual(ex)
})

test('Continued fraction for e is as expected', () => {
  const ex = [2, 1, 2, 1, 1, 4, 1, 1, 6, 1, 1, 8, 1, 1, 10, 1, 1, 12, 1, 1, 9]
  const r = []
  for (const n of continuedFraction(Math.E)) {
    r.push(n)
  }
  expect(r).toStrictEqual(ex)
})

test('Continued fraction for √2 is as expected', () => {
  const ex = [1].concat(Array(21).fill(2))
  const r = []
  for (const n of continuedFraction(Math.SQRT2)) {
    r.push(n)
  }
  expect(r).toStrictEqual(ex)
})

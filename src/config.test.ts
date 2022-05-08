import { EPSILON, MAX_LOOPS } from './config'

test('Epsilon is reasonable', () => {
  expect(EPSILON).toBeTruthy()
  expect(EPSILON).toBeCloseTo(0)
  expect(MAX_LOOPS).toBeGreaterThan(10)
})

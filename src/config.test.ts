import {EPSILON} from './config'

test('Epsilon is reasonable', () => {
  expect(EPSILON).toBeTruthy()
  expect(EPSILON).toBeCloseTo(0)
})

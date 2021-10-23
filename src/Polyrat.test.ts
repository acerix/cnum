import Polyrat, { stringToPolyrat } from './Polyrat'
import Rat from './Rat'

test('New Polyrat is the expected type', () => {
  const a = new Polyrat()
  expect(typeof a).toBe('object')
  expect(a.constructor.name).toBe('Polyrat')
})

test('Cloning maintains the string representation', () => {
  const a = new Polyrat({'0': new Rat(2)})
  const b = a.clone()
  expect(a.toString()).toBe(b.toString())
})

test('"[]" is the same after stringToPolyrat then toString.', () => {
  const s = '[]'
  expect(stringToPolyrat(s).toString()).toBe(s)
})

// test('Evaluation of y = x^2 for x=3 is 9', () => {
//   const a = new Polyrat()
//   a.p[2] = new Rat(1n)
//   const x = new Rat(3n)
//   expect(+a.evaluate(x)).toBe(9n)
// })

import Polyrat from './Polyrat'
import Rat from './Rat'

test('New Polyrat is the expected type', () => {
  const a = new Polyrat()
  expect(typeof a).toBe('object')
  expect(a.constructor.name).toBe('Polyrat')
})

test('Cloning maintains the string representation', () => {
  const a = new Polyrat()
  a.p.push(new Rat(69))
  const b = a.clone()
  expect(a.toString()).toBe(b.toString())
})

test('Evaluation of y = x^2 for x=3 is 9', () => {
  const a = new Polyrat()
  a.p[2] = new Rat(1n)
  expect(+a.evaluate(3n)).toBe(9)
})

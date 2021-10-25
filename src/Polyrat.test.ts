import Polyrat, { stringToPolyrat } from './Polyrat'
import Rat from './Rat'

const lemniscateOfBernoulli = new Polyrat({
  '2,0': new Rat(-2),
  '4,0': new Rat( 1),
  '0,2': new Rat( 2),
  '2,2': new Rat( 2),
  '0,4': new Rat( 1),
})

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

test('Empty stringToPolyrat is empty.', () => {
  expect(stringToPolyrat('[]').coefficents.toString()).toBe('')
})

test('Evaluation of y = x^2 for x=3 is 9', () => {
  const a = new Polyrat({'2': new Rat(1n)})
  const x = new Rat(3n)
  expect(a.evaluate([x]).toString()).toBe('9')
})

test('JSONing the Lemniscate of Bernoulli', () => {
  expect(lemniscateOfBernoulli.toJSON()).toBe("['2,0':'-2','4,0':'1','0,2':'2','2,2':'2','0,4':'1']")
})

test('Formula for evaluating the Lemniscate of Bernoulli in HTML', () => {
  expect(lemniscateOfBernoulli.toHTMLFormula()).toBe('-2x<sup>2</sup> + x<sup>4</sup> + 2y<sup>2</sup> + 2x<sup>2</sup>y<sup>2</sup> + y<sup>4</sup>')
})

test('Formula for evaluating the Lemniscate of Bernoulli in calc', () => {
  expect(lemniscateOfBernoulli.toCalcFormula()).toBe('-2*x^2 + x^4 + 2*y^2 + 2*x^2*y^2 + y^4')
})

test('GLSL formula for the Lemniscate of Bernoulli', () => {
  expect(lemniscateOfBernoulli.toGLSLFormula()).toBe('-2.0*pow(x,2.0)+pow(x,4.0)+2.0*pow(y,2.0)+2.0*pow(x,2.0)*pow(y,2.0)+pow(y,4.0)')
})

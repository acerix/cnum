import Polyrat, { stringToPolyrat } from './Polyrat'
import Rat from './Rat'

const line = new Polyrat({
  '1,0': new Rat( 1),
  '0,1': new Rat(-1)
})

const parabola = new Polyrat({
  '2,0': new Rat( 1),
  '0,1': new Rat(-1)
})

const fermatCurve = new Polyrat({
  '0,0': new Rat(-1),
  '3,0': new Rat( 1),
  '0,3': new Rat( 1)
})

const lemniscateOfBernoulli = new Polyrat({
  '2,0': new Rat(-2),
  '4,0': new Rat( 1),
  '0,2': new Rat( 2),
  '2,2': new Rat( 2),
  '0,4': new Rat( 1)
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

test('Formula for zero function in HTML', () => {
  expect(new Polyrat({}).toHTMLFormula()).toBe('0')
})

test('Formula for evaluating the basic line in HTML', () => {
  expect(line.toHTMLFormula()).toBe('x + -1y')
})

test('Formula for evaluating the basic parabola in HTML', () => {
  expect(parabola.toHTMLFormula()).toBe('x<sup>2</sup> + -1y')
})

test('Formula for evaluating the Fermat curve in HTML', () => {
  expect(fermatCurve.toHTMLFormula()).toBe('-1 + x<sup>3</sup> + y<sup>3</sup>')
})

test('Formula for evaluating the Lemniscate of Bernoulli in HTML', () => {
  expect(lemniscateOfBernoulli.toHTMLFormula()).toBe('-2x<sup>2</sup> + x<sup>4</sup> + 2y<sup>2</sup> + 2x<sup>2</sup>y<sup>2</sup> + y<sup>4</sup>')
})

test('Formula for zero function in standard alpha form in HTML', () => {
  expect(new Polyrat({}).toStandardAlphaFormHTML()).toBe('0')
})

test('Formula for one function in standard alpha form in HTML', () => {
  expect(new Polyrat({0: new Rat(1)}).toStandardAlphaFormHTML()).toBe('1')
})

test('Formula for 1/x function in standard alpha form in HTML', () => {
  expect(new Polyrat({'-1': new Rat(1)}).toStandardAlphaFormHTML()).toBe('1') // @todo should be 1/x ??
})

test('Formula for some function in standard alpha form in HTML', () => {
  expect(new Polyrat({'42': new Rat(42)}).toStandardAlphaFormHTML()).toBe('42x<sup>42</sup>')
})

test('Formula for evaluating the basic line in standard alpha form in HTML', () => {
  expect(line.toStandardAlphaFormHTML()).toBe('x + -1y')
})

test('Formula for evaluating a function with a negative one exponent in standard alpha form in HTML', () => {
  expect(new Polyrat({
    '1,0': new Rat(1),
    '0,-1': new Rat(1)
  }).toStandardAlphaFormHTML()).toBe('x / y')
})

test('Formula for evaluating a function with a negative exponent less than one in standard alpha form in HTML', () => {
  expect(new Polyrat({
    '1,0': new Rat(1),
    '0,-69': new Rat(1)
  }).toStandardAlphaFormHTML()).toBe('x / y<sup>69</sup>')
})

test('Formula for zero function in calc', () => {
  expect(new Polyrat({}).toCalcFormula()).toBe('0')
})

test('Formula for constant function in calc', () => {
  expect(new Polyrat({
    '0': new Rat( 42),
    '1': new Rat(-1)
  }).toCalcFormula()).toBe('42 + -1*x')
})

test('Formula for evaluating the basic line in calc', () => {
  expect(line.toCalcFormula()).toBe('x + -1*y')
})

test('Formula for evaluating the basic parabola in calc', () => {
  expect(parabola.toCalcFormula()).toBe('x^2 + -1*y')
})

test('Formula for evaluating the Lemniscate of Bernoulli in calc', () => {
  expect(lemniscateOfBernoulli.toCalcFormula()).toBe('-2*x^2 + x^4 + 2*y^2 + 2*x^2*y^2 + y^4')
})

test('Formula for zero function in GLSL', () => {
  expect(new Polyrat({}).toGLSLFormula()).toBe('0.0')
})

test('GLSL formula for the Lemniscate of Bernoulli', () => {
  expect(lemniscateOfBernoulli.toGLSLFormula()).toBe('-2.0*x*x+x*x*x*x+2.0*y*y+2.0*x*x*y*y+y*y*y*y')
})

test('GLSL formula with negative exponent', () => {
  expect(new Polyrat({
    '-2,0': new Rat(1),
    '0,1': new Rat(-1)
  }).toGLSLFormula()).toBe('1.0/(1.0*x*x*1.0)+-1.0*y')
})

import Polyrat, { Coefficents, stringToPolyrat } from './Polyrat'
import Rat from './Rat'

const line = new Polyrat({
  '1,0': 1n,
  '0,1': -1n,
})

const parabola = new Polyrat({
  '2,0': 1n,
  '0,1': -1n,
})

const fermatCurve = new Polyrat({
  '0,0': -1n,
  '3,0': 1n,
  '0,3': 1n,
})

const lemniscateOfBernoulli = new Polyrat({
  '2,0': -2n,
  '4,0': 1n,
  '0,2': 2n,
  '2,2': 2n,
  '0,4': 1n,
})

test('New Polyrat is the expected type', () => {
  const a = new Polyrat()
  expect(typeof a).toBe('object')
  expect(a.constructor.name).toBe('Polyrat')
})

test('Cloning maintains the string representation', () => {
  const a = new Polyrat({ '0': 2n })
  const b = a.clone()
  expect(a.toString()).toBe(b.toString())
})

test('Empty stringToPolyrat is empty.', () => {
  expect(stringToPolyrat('[]').coefficents.toString()).toBe('')
})

test('Evaluation of y = x^2 for x=3 is 9', () => {
  const a = new Polyrat({ '2': 1n })
  const x = new Rat(3n)
  expect(a.evaluate([x]).toString()).toBe('9')
})

test('JSONing the Lemniscate of Bernoulli', () => {
  expect(lemniscateOfBernoulli.toJSON()).toBe(
    '{"2,0":"-2","4,0":"1","0,2":"2","2,2":"2","0,4":"1"}',
  )
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
  expect(lemniscateOfBernoulli.toHTMLFormula()).toBe(
    '-2x<sup>2</sup> + x<sup>4</sup> + 2y<sup>2</sup> + 2x<sup>2</sup>y<sup>2</sup> + y<sup>4</sup>',
  )
})

test('Formula for zero function in standard alpha form in HTML', () => {
  expect(new Polyrat({}).toStandardAlphaFormHTML()).toBe('0')
})

test('Formula for one function in standard alpha form in HTML', () => {
  expect(new Polyrat({ 0: 1n }).toStandardAlphaFormHTML()).toBe('1')
})

test('Formula for 1/x function in standard alpha form in HTML', () => {
  expect(new Polyrat({ '-1': 1n }).toStandardAlphaFormHTML()).toBe('1 / α')
})

test('Formula for some function in standard alpha form in HTML', () => {
  expect(new Polyrat({ '42': 42n }).toStandardAlphaFormHTML()).toBe(
    '42α<sup>42</sup>',
  )
})

test('Formula for the Lemniscate of Bernoulli in standard alpha form in HTML', () => {
  expect(lemniscateOfBernoulli.toStandardAlphaFormHTML()).toBe(
    '-2α<sup>2</sup> + α<sup>4</sup> + 2β<sup>2</sup> + 2α<sup>2</sup>β<sup>2</sup> + β<sup>4</sup>',
  )
})

// test('Formula for some polynomial in standard alpha form in HTML', () => {
//   expect(new Polyrat({
//     '0,0': -13n,
//     '0,0': 11n,
//     '2,2': -5, 3,
//     '-2,2': -5, 3,
//     '0,2': -1,
//   }).toStandardAlphaFormHTML()).toBe('-13/11 + -5α<sup>2</sup>β<sup>2</sup> - β<sup>4</sup> + β<sup>9</sup> / 3α<sup>2</sup>β<sup>2</sup> + 7β<sup>4</sup>')
// })

test('Formula for evaluating the basic line in standard alpha form in HTML', () => {
  expect(line.toStandardAlphaFormHTML()).toBe('α + -1β')
})

test('Formula for evaluating a function with a negative one exponent in standard alpha form in HTML', () => {
  expect(
    new Polyrat({
      '1,0': 1n,
      '0,-1': 1n,
    }).toStandardAlphaFormHTML(),
  ).toBe('α / β')
})

test('Formula for evaluating a function with a negative exponent less than one in standard alpha form in HTML', () => {
  expect(
    new Polyrat({
      '1,0': 1n,
      '0,-69': 1n,
    }).toStandardAlphaFormHTML(),
  ).toBe('α / β<sup>69</sup>')
})

test('Formula for zero function in calc', () => {
  expect(new Polyrat({}).toCalcFormula()).toBe('0')
})

test('Formula for constant function in calc', () => {
  expect(
    new Polyrat({
      '0': 42n,
      '1': -1n,
    }).toCalcFormula(),
  ).toBe('42 + -1*x')
})

test('Formula for evaluating the basic line in calc', () => {
  expect(line.toCalcFormula()).toBe('x + -1*y')
})

test('Formula for evaluating the basic parabola in calc', () => {
  expect(parabola.toCalcFormula()).toBe('x^2 + -1*y')
})

test('Formula for evaluating the Lemniscate of Bernoulli in calc', () => {
  expect(lemniscateOfBernoulli.toCalcFormula()).toBe(
    '-2*x^2 + x^4 + 2*y^2 + 2*x^2*y^2 + y^4',
  )
})

test('Formula for zero function in GLSL', () => {
  expect(new Polyrat({}).toGLSLFormula()).toBe('0.0')
})

test('GLSL formula for the Lemniscate of Bernoulli', () => {
  expect(lemniscateOfBernoulli.toGLSLFormula()).toBe(
    '-2.0*x*x+x*x*x*x+2.0*y*y+2.0*x*x*y*y+y*y*y*y',
  )
})

test('GLSL formula with negative exponent', () => {
  expect(
    new Polyrat({
      '-2,0': 1n,
      '0,1': -1n,
    }).toGLSLFormula(),
  ).toBe('1.0/(1.0*x*x*1.0)+-1.0*y')
})

test('JSON formula is the same as JSON', () => {
  const json = lemniscateOfBernoulli.toJSON()
  const obj = JSON.parse(json) as Coefficents
  expect(JSON.stringify(obj)).toBe(json)
})

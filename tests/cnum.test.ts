import cnum, { Rat, Polyrat, floatToRat, parseRat } from '../src/cnum'

test('Evaluation of "1" is "1"', () => {
  expect(cnum.evaluate('1')).toBe('1')
})

test('Evaluation of "wtf" throws undefined error', () => {
  expect(() => {
    cnum.evaluate('wtf')
  }).toThrow('"wtf" is undefined')
})

test('New Rat from main is the expected type', () => {
  const a = new Rat()
  expect(typeof a).toBe('object')
  expect(a.constructor.name).toBe('Rat')
})

test('New Polyrat from main is the expected type', () => {
  const a = new Polyrat()
  expect(typeof a).toBe('object')
  expect(a.constructor.name).toBe('Polyrat')
})

test('-420/69 converted to a float and back to a Rat is "-140/23"', () => {
  const a = new Rat(-420, 69)
  expect(floatToRat(+a).toString()).toBe('-140/23')
})

test('"420" converted to a Rat is "420"', () => {
  const a = '420'
  expect(parseRat(a).toString()).toBe('420')
})

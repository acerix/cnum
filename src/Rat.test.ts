import Rat from './Rat'

test('New Rat is expected type', () => {
  const a = new Rat()
  expect(typeof a).toBe('object')
  expect(a.constructor.name).toBe('Rat')
})

test('Value of -13 is -13', () => {
  const a = new Rat(-13)
  expect(+a).toBe(-13)
})

test('Default is zero', () => {
  const a = new Rat()
  expect(+a).toBe(0)
})

test('One is one', () => {
  const a = new Rat(1)
  expect(+a).toBe(1)
})

test('A non-zero integer over zero is infinity', () => {
  const a = new Rat(13, 0)
  expect(+a).toBe(Infinity)
})

test('Zero over zero is not a number', () => {
  const a = new Rat(0, 0)
  expect(+a).toBe(NaN)
})

test('Zero over a positive number is still zero', () => {
  const a = new Rat(0, 21)
  expect(+a).toBe(0)
})

test('Zero over a negative number is negative zero?', () => {
  const a = new Rat(0, -21)
  expect(+a).toBe(-0)
})

test('Zero plus zero is zero', () => {
  const a = new Rat()
  const b = new Rat()
  expect(+a.add(b)).toBe(0)
})

test('One plus one is two', () => {
  const a = new Rat(1)
  const b = new Rat(1)
  expect(+a.add(b)).toBe(2)
})

test('Five times three is fifteen', () => {
  const a = new Rat(5)
  const b = new Rat(3)
  expect(+a.multiply(b)).toBe(15)
})

test('Mediant of 0/1 and 1/1 is 1/2', () => {
  const a = new Rat()
  const b = new Rat(1)
  expect(+a.mediant(b)).toBe(1/2)
})

test('-2/3 divided by 13/11 is -22/39', () => {
  const a = new Rat(-2, 3)
  const b = new Rat(13, 11)
  expect(+a.divide(b)).toBe(-22/39)
})

test('5 to the power of 2 is 25', () => {
  const a = new Rat(5)
  const b = new Rat(2)
  expect(+a.pow(b)).toBe(25)
})

test('Dot product of 3/5 and 7/3 to be 36', () => {
  const a = new Rat(3, 5)
  const b = new Rat(7, 3)
  expect(Number(a.dot(b))).toBe(36)
})

test('7/3 equals 7/3', () => {
  const a = new Rat(7, 3)
  const b = new Rat(7, 3)
  expect(a.equals(b)).toBe(true)
})

test('13/3 is greater than 12/3', () => {
  const a = new Rat(13, 3)
  const b = new Rat(12, 3)
  expect(a.isGreaterThan(b)).toBe(true)
})

test('11/3 is less than 12/3', () => {
  const a = new Rat(11, 3)
  const b = new Rat(12, 3)
  expect(a.isLessThan(b)).toBe(true)
})

test('Absolute value of -3 is 3', () => {
  const a = new Rat(-1)
  expect(+a.abs()).toBe(1)
})

test('Absolute value of 5 is 5', () => {
  const a = new Rat(5)
  expect(+a.abs()).toBe(5)
})

test('Opposite of -3/2 is 3/2', () => {
  const a = new Rat(-3, 2)
  expect(+a.opposite()).toBe(3/2)
})

test('-7/4 is negative', () => {
  const a = new Rat(-7, 4)
  expect(a.isNegative()).toBe(true)
})

test('Inversion of -3/5 is -5/3', () => {
  const a = new Rat(-3, 5)
  expect(+a.invert()).toBe(-5/3)
})

test('Text representation of 69/1 is "69"', () => {
  const a = new Rat(69, 1)
  expect(a.toString()).toBe('69')
})

test('Text representation of -2/420 is "-1/420"', () => {
  const a = new Rat(-2, 420)
  expect(a.toString()).toBe('-2/420')
})

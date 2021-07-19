import rat from './main'

test('New rat is expected type', () => {
  const a = new rat()
  expect(typeof a).toBe('object')
  expect(a.constructor.name).toBe('rat')
})

test('Value of -13 is -13', () => {
  const a = new rat(-13)
  expect(+a).toBe(-13)
})

test('Text representation of 69/1 is "69"', () => {
  const a = new rat(-1, 69)
  expect(a.toString()).toBe('-1/69')
})

test('Text representation of -1/420 is "-1/420"', () => {
  const a = new rat(-1, 420)
  expect(a.toString()).toBe('-1/420')
})

test('Zero plus zero is zero', () => {
  const a = new rat()
  const b = new rat()
  expect(+a.add(b)).toBe(0)
})

test('One plus one is two', () => {
  const a = new rat(1)
  const b = new rat(1)
  expect(+a.add(b)).toBe(2)
})

test('Five times three is fifteen', () => {
  const a = new rat(5)
  const b = new rat(3)
  expect(+a.multiply(b)).toBe(15)
})

test('Mediant of 0/1 and 1/1 is 1/2', () => {
  const a = new rat()
  const b = new rat(1)
  expect(+a.mediant(b)).toBe(1/2)
})

test('-2/3 divided by 13/11 is -22/39', () => {
  const a = new rat(-2, 3)
  const b = new rat(13, 11)
  expect(+a.divide(b)).toBe(-22/39)
})

test('5 to the power of 2 is 25', () => {
  const a = new rat(5)
  const b = new rat(2)
  expect(+a.pow(b)).toBe(25)
})

test('Dot product of 3/5 and 7/3 to be 36', () => {
  const a = new rat(3, 5)
  const b = new rat(7, 3)
  expect(Number(a.dot(b))).toBe(36)
})

test('7/3 equals 7/3', () => {
  const a = new rat(7, 3)
  const b = new rat(7, 3)
  expect(a.equals(b)).toBe(true)
})

test('13/3 is greater than 12/3', () => {
  const a = new rat(13, 3)
  const b = new rat(12, 3)
  expect(a.isGreaterThan(b)).toBe(true)
})

test('11/3 is less than 12/3', () => {
  const a = new rat(11, 3)
  const b = new rat(12, 3)
  expect(a.isLessThan(b)).toBe(true)
})

test('Absolute value of -1 is 1', () => {
  const a = new rat(-1)
  expect(+a.abs()).toBe(1)
})

test('Opposite of -3/2 is 3/2', () => {
  const a = new rat(-3, 2)
  expect(+a.opposite()).toBe(3/2)
})

test('-7/4 is negative', () => {
  const a = new rat(-7, 4)
  expect(a.isNegative()).toBe(true)
})

test('Inversion of -3/5 is -5/3', () => {
  const a = new rat(-3, 5)
  expect(+a.invert()).toBe(-5/3)
})

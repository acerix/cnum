import Rat, {FloatToRat} from './Rat'

test('New Rat is the expected type', () => {
  const a = new Rat()
  expect(typeof a).toBe('object')
  expect(a.constructor.name).toBe('Rat')
})

test('Value of -13 is -13', () => {
  const a = new Rat(-13)
  expect(+a).toBe(-13)
})

test('Text representation of 69/1 is "69"', () => {
  const a = new Rat(69, 1)
  expect(a.toString()).toBe('69')
})

test('Text representation of -222/840 is "-37/140"', () => {
  const a = new Rat(-222, 840)
  expect(a.toString()).toBe('-37/140')
})

test('Default is zero', () => {
  const a = new Rat()
  expect(+a).toBe(0)
})

test('One is one', () => {
  const a = new Rat(1)
  expect(+a).toBe(1)
})

test('Cloning maintains the value', () => {
  const a = new Rat(42, -69)
  const b = a.clone()
  expect(+a).toBe(+b)
})

test('Mutating a clone does not affect the value of the original', () => {
  const a = new Rat(42, -69)
  const original = +a
  const b = a.clone()
  b.n = BigInt(33)
  expect(+a).toBe(original)
})

// test('The reciprocol of zero divided by a negative number is negative infinity', () => {
//   const a = new Rat(0, -69)
//   expect(+a.inv()).toBe(-Infinity)
// })

test('A non-zero integer divided by zero is infinity', () => {
  const a = new Rat(13, 0)
  expect(+a).toBe(Infinity)
})

test('Zero divided by zero is not a number', () => {
  const a = new Rat(0, 0)
  expect(+a).toBe(NaN)
})

test('Zero over a positive number is still zero', () => {
  const a = new Rat(0, 21)
  expect(+a).toBe(0)
})

// test('Zero over a negative number is negative zero', () => {
//   const a = new Rat(0, -21)
//   expect(+a).toBe(-0)
// })

test('The denominator of zero divided by a number greater than zero is normalized to one', () => {
  const a = new Rat(0, 42)
  const b = new Rat(1, 0)
  expect(+a.mediant(b)).toBe(1)
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

test('5/7 minus 21/2 is -137/14', () => {
  const a = new Rat(5, 7)
  const b = new Rat(21, 2)
  expect(a.sub(b).toString()).toBe('-137/14')
})

test('Five times three is fifteen', () => {
  const a = new Rat(5)
  const b = new Rat(3)
  expect(+a.mul(b)).toBe(15)
})

test('-2/3 divided by 13/11 is -22/39', () => {
  const a = new Rat(-2, 3)
  const b = new Rat(13, 11)
  expect(+a.div(b)).toBe(-22/39)
})

test('Mediant of 0/1 and 1/1 is 1/2', () => {
  const a = new Rat()
  const b = new Rat(1)
  expect(+a.mediant(b)).toBe(1/2)
})

test('5 to the power of 2 is 25', () => {
  const a = new Rat(5)
  const b = new Rat(2)
  expect(+a.pow(b)).toBe(25)
})

test('Minimum of 3/5 and 5/3 is 5/3', () => {
  const a = new Rat(3, 5)
  const b = new Rat(5, 3)
  expect(+a.min(b)).toBe(3/5)
})

test('Minimum of -3/5 and -5/3 is -5/3', () => {
  const a = new Rat(-3, 5)
  const b = new Rat(-5, 3)
  expect(+a.min(b)).toBe(-5/3)
})

test('Maximum of 7/15 and -5/3 is 7/15', () => {
  const a = new Rat(7, 15)
  const b = new Rat(-5, 3)
  expect(+a.max(b)).toBe(7/15)
})

test('Maximum of -7/15 and 5/3 is 5/3', () => {
  const a = new Rat(-7, 15)
  const b = new Rat(5, 3)
  expect(+a.max(b)).toBe(5/3)
})

test('Dot product of 3/5 and 7/3 is 36', () => {
  const a = new Rat(3, 5)
  const b = new Rat(7, 3)
  expect(Number(a.dot(b))).toBe(36)
})

test('7/3 equals 7/3', () => {
  const a = new Rat(7, 3)
  const b = new Rat(7, 3)
  expect(a.equals(b)).toBe(true)
})

test('7/3 does not equal 5/3', () => {
  const a = new Rat(7, 3)
  const b = new Rat(5, 3)
  expect(a.equals(b)).toBe(false)
})

test('7/3 approximates 7/3', () => {
  const a = new Rat(7, 3)
  const b = new Rat(7, 3)
  expect(a.approximates(+b)).toBe(true)
})

test('7/3 does not approximate 47/3', () => {
  const a = new Rat(7, 3)
  const b = new Rat(37, 3)
  expect(a.approximates(+b)).toBe(false)
})

test('1/100000000000000001 approximates 1/100000000000000002', () => {
  const a = new Rat(1, BigInt('100000000000000001'))
  const b = new Rat(1, BigInt('100000000000000002'))
  expect(a.approximates(+b)).toBe(true)
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
  expect(+a.neg()).toBe(3/2)
})

test('-7/4 is negative', () => {
  const a = new Rat(-7, 4)
  expect(a.isNegative()).toBe(true)
})

test('Reciprocol of -3/5 is -5/3', () => {
  const a = new Rat(-3, 5)
  expect(+a.inv()).toBe(-5/3)
})

test('Square root of 256 is 16', () => {
  const a = new Rat(256)
  expect(+a.sqrt()).toBe(16)
})

test('5th root of 759375/16807 is 15/7', () => {
  const a = new Rat(759375, 16807)
  const n = 5
  expect(+a.root(n)).toBe(15/7)
})

test('Root of a negative throws up', () => {
  const a = new Rat(-1)
  expect(() => {+a.sqrt()}).toThrow('Roots of negative numbers like -1 are too complex for this basic library')
})

test('4242/666 is rounded to 6', () => {
  const a = new Rat(4242, 666)
  expect(Number(a.round())).toBe(6)
})

test('Continued fraction coefficients of 6/9 are [0, 1, 2]', () => {
  const a = new Rat(6, 9)
  const cf = []
  for (const n of a.continuedFraction()) cf.push(Number(n))
  console.log(cf)
  expect(cf).toStrictEqual([0, 1, 2])
})

test('0.5 is converted to "1/2"', () => {
  const n = .5
  expect(FloatToRat(n).toString()).toBe('1/2')
})

test('Not a number is converted to "0/0"', () => {
  const n = 0/0
  expect(FloatToRat(n).toString()).toBe('0/0')
})

test('Infinity is converted to "1/0"', () => {
  const n = Infinity
  expect(FloatToRat(n).toString()).toBe('1/0')
})

test('-Infinity is converted to "-1/0"', () => {
  const n = -Infinity
  expect(FloatToRat(n).toString()).toBe('-1/0')
})

test('42069 is converted to "42069"', () => {
  const n = 42069
  expect(FloatToRat(n).toString()).toBe('42069')
})

test('-1/42069 is converted to "-1/42069"', () => {
  const n = -1/42069
  expect(FloatToRat(n).toString()).toBe('-1/42069')
})

test('-420/69 converted to a float and back to a Rat is "-140/23"', () => {
  const a = new Rat(-420, 69)
  expect(FloatToRat(+a).toString()).toBe('-140/23')
})

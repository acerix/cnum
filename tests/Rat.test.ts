import Rat, { floatToRat, parseRat } from '../src/Rat'

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

test('Profile of 1/2 is as expected', () => {
  const a = new Rat(1, 2)
  expect(a.profile).toBe(
    'Rat: 1/2 (≈0.5)' +
      '\n' +
      'Mixed: 1/2' +
      '\n' +
      'Continued: [0; 2]' +
      '\n' +
      'Factorization: 2^-1' +
      '\n' +
      'Egyptian: 1/2' +
      '\n' +
      'Babylonian: 30 * 60^-1' +
      '\n' +
      'psin(t): 4/5' +
      '\n' +
      'pcos(t): 3/5' +
      '\n' +
      'ptan(t): 4/3',
  )
})

test('Profile of 7/5 is as expected', () => {
  const a = new Rat(7, 5)
  expect(a.profile).toBe(
    'Rat: 7/5 (≈1.4)' +
      '\n' +
      'Mixed: 1 + 2/5' +
      '\n' +
      'Continued: [1; 2, 2]' +
      '\n' +
      'Factorization: 5^-1 * 7' +
      '\n' +
      'Egyptian: 1 + 1/3 + 1/15' +
      '\n' +
      'Babylonian: 1 * 60^0 + 23 * 60^-1 + 59 * 60^-2 + 59 * 60^-3 + 59 * 60^-4 + 59 * 60^-5 + 59 * 60^-6 + 59 * 60^-7 + 59 * 60^-8 + 58 * 60^-9 + 48 * 60^-10 + 23 * 60^-11 + 37 * 60^-12 + 11 * 60^-13 + 14 * 60^-14 + 17 * 60^-15 + 40 * 60^-16 + 29 * 60^-17 + 4 * 60^-18 + 13 * 60^-19 + 54 * 60^-21 + 29 * 60^-22 + 31 * 60^-23 + 52 * 60^-24 + 30 * 60^-25' +
      '\n' +
      'psin(t): 35/37' +
      '\n' +
      'pcos(t): -12/37' +
      '\n' +
      'ptan(t): -35/12',
  )
})

test('Profile of 420/69 is as expected', () => {
  const a = new Rat(420, 69)
  expect(a.profile).toBe(
    'Rat: 140/23 (≈6.086956521739131)' +
      '\n' +
      'Mixed: 6 + 2/23' +
      '\n' +
      'Continued: [6; 11, 2]' +
      '\n' +
      'Factorization: 2^2 * 5 * 7 * 23^-1' +
      '\n' +
      'Egyptian: 6 + 1/12 + 1/276' +
      '\n' +
      'Babylonian: 6 * 60^0 + 5 * 60^-1 + 13 * 60^-2 + 2 * 60^-3 + 36 * 60^-4 + 31 * 60^-5 + 18 * 60^-6 + 15 * 60^-7 + 39 * 60^-8 + 11 * 60^-9 + 43 * 60^-10 + 3 * 60^-11 + 50 * 60^-12 + 54 * 60^-13 + 39 * 60^-14 + 28 * 60^-15 + 27 * 60^-16 + 6 * 60^-17 + 56 * 60^-18 + 41 * 60^-19 + 2 * 60^-20 + 15 * 60^-21 + 21 * 60^-22 + 5 * 60^-23 + 37 * 60^-24 + 30 * 60^-25' +
      '\n' +
      'psin(t): 6440/20129' +
      '\n' +
      'pcos(t): -19071/20129' +
      '\n' +
      'ptan(t): -6440/19071',
  )
})

// @todo too slow
// eslint-disable-next-line jest/no-commented-out-tests
// test('Profile of 355/113 is as expected', () => {
//   const a = new Rat(355, 113)
//   expect(a.profile).toBe(
//     'Rat: 355/113 (≈3.1415929203539825)'
//     + '\n' + 'Mixed: 3 + 16/113'
//     + '\n' + 'Continued: [3; 7, 16]'
//     + '\n' + 'Factorization: 5 * 71 * 113^-1'
//     + '\n' + 'Egyptian: 3 + 1/8 + 1/61 + 1/5014 + 1/27649202 + 1/1911195900442808'
//     + '\n' + 'Babylonian: 3 * 60^0 + 8 * 60^-1 + 29 * 60^-2 + 44 * 60^-3 + 4 * 60^-4 + 14 * 60^-5 + 52 * 60^-6 + 2 * 60^-7 + 7 * 60^-8 + 28 * 60^-9 + 14 * 60^-10 + 8 * 60^-11 + 8 * 60^-12 + 24 * 60^-13 + 46 * 60^-14 + 42 * 60^-15 + 33 * 60^-16 + 4 * 60^-17 + 54 * 60^-18 + 49 * 60^-19 + 5 * 60^-20 + 12 * 60^-21 + 53 * 60^-22 + 26 * 60^-23 + 15 * 60^-24'
//     + '\n' + 'psin(t): 40115/69397'
//     + '\n' + 'pcos(t): -56628/69397'
//     + '\n' + 'ptan(t): -40115/56628'
//   )
// })

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
  b.n = 33n
  expect(+a).toBe(original)
})

// eslint-disable-next-line jest/no-commented-out-tests
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

// eslint-disable-next-line jest/no-commented-out-tests
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
  expect(+a.div(b)).toBe(-22 / 39)
})

test('Mediant of 0/1 and 1/1 is 1/2', () => {
  const a = new Rat()
  const b = new Rat(1)
  expect(+a.mediant(b)).toBe(1 / 2)
})

test('-33 to the power of 0 is 1', () => {
  const a = new Rat(-11)
  const b = new Rat(0)
  expect(+a.pow(b)).toBe(1)
})

test('8 to the power of 2/3 is 4', () => {
  const a = new Rat(8)
  const b = new Rat(2, 3)
  expect(+a.pow(b)).toBeCloseTo(4)
})

test('5 to the power of 2 is 25', () => {
  const a = new Rat(5)
  const b = new Rat(2)
  expect(+a.pow(b)).toBe(25)
})

test('Minimum of 3/5 and 5/3 is 5/3', () => {
  const a = new Rat(3, 5)
  const b = new Rat(5, 3)
  expect(+a.min(b)).toBe(3 / 5)
})

test('Minimum of -3/5 and -5/3 is -5/3', () => {
  const a = new Rat(-3, 5)
  const b = new Rat(-5, 3)
  expect(+a.min(b)).toBe(-5 / 3)
})

test('Maximum of 7/15 and -5/3 is 7/15', () => {
  const a = new Rat(7, 15)
  const b = new Rat(-5, 3)
  expect(+a.max(b)).toBe(7 / 15)
})

test('Maximum of -7/15 and 5/3 is 5/3', () => {
  const a = new Rat(-7, 15)
  const b = new Rat(5, 3)
  expect(+a.max(b)).toBe(5 / 3)
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
  const a = new Rat(1, 100000000000000001n)
  const b = new Rat(1, 100000000000000002n)
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
  expect(+a.neg()).toBe(3 / 2)
})

test('6/4 is not negative', () => {
  const a = new Rat(6, 4)
  expect(a.isNegative()).toBe(false)
})

test('-7/4 is negative', () => {
  const a = new Rat(-7, 4)
  expect(a.isNegative()).toBe(true)
})

test('-71/9 is finite', () => {
  const a = new Rat(-71, 9)
  expect(a.isFinite()).toBe(true)
})

test('Infinity is not finite', () => {
  const a = floatToRat(Infinity)
  expect(a.isFinite()).toBe(false)
})

test('Reciprocol of -3/5 is -5/3', () => {
  const a = new Rat(-3, 5)
  expect(+a.inv()).toBe(-5 / 3)
})

test('Square root of one is one', () => {
  const a = new Rat(1)
  expect(+a.root(2)).toBe(1)
})

test('Square root of 256 is 16', () => {
  const a = new Rat(256)
  expect(+a.sqrt()).toBe(16)
})

test('5th root of 759375/16807 is 15/7', () => {
  const a = new Rat(759375, 16807)
  const n = 5
  expect(+a.root(n)).toBe(15 / 7)
})

test('Root of infinity is also infinity', () => {
  const a = new Rat(1, 0)
  const n = 7
  expect(+a.root(n)).toBe(Infinity)
})

test('Root of a negative throws up', () => {
  const a = new Rat(-1)
  expect(() => {
    a.sqrt()
  }).toThrow(
    'Roots of negative numbers like -1 are too complex for this basic library',
  )
})

test('4242/666 is rounded to 6', () => {
  const a = new Rat(4242, 666)
  expect(Number(a.round())).toBe(6)
})

test('Flooring 420.69 is 420', () => {
  const a = floatToRat(420.69)
  expect(a.floor()).toBe(420n)
})

test('Flooring -42.69 is -43', () => {
  const a = floatToRat(-42.69)
  expect(a.floor()).toBe(-43n)
})

test('Ceilinging -420.69 is -420', () => {
  const a = floatToRat(-420.69)
  expect(a.ceil()).toBe(-420n)
})

test('psin(0) = 0', () => {
  const a = new Rat(0)
  expect(+a.psin()).toBe(0)
})

test('psin(1) = 1', () => {
  const a = new Rat(1)
  expect(+a.psin()).toBe(1)
})

test('psin(-1) = -1', () => {
  const a = new Rat(-1)
  expect(+a.psin()).toBe(-1)
})

test('psin(Infinity) = 0', () => {
  const a = floatToRat(Infinity)
  expect(+a.psin()).toBe(0)
})

test('psin(1/2) = 4/5', () => {
  const a = new Rat(1, 2)
  expect(a.psin().toString()).toBe('4/5')
})

test('psin(2) = 4/5', () => {
  const a = new Rat(2)
  expect(a.psin().toString()).toBe('4/5')
})

test('psin(3) = 3/5', () => {
  const a = new Rat(3)
  expect(a.psin().toString()).toBe('3/5')
})

test('pcos(0) = 1', () => {
  const a = new Rat(0)
  expect(+a.pcos()).toBe(1)
})

test('pcos(1) = 0', () => {
  const a = new Rat(1)
  expect(+a.pcos()).toBe(0)
})

test('pcos(-1) = 0', () => {
  const a = new Rat(-1)
  expect(+a.pcos()).toBe(0)
})

test('pcos(Infinity) = -1', () => {
  const a = floatToRat(Infinity)
  expect(+a.pcos()).toBe(-1)
})

test('pcos(1/2) = 3/5', () => {
  const a = new Rat(1, 2)
  expect(a.pcos().toString()).toBe('3/5')
})

test('pcos(2) = -3/5', () => {
  const a = new Rat(2)
  expect(a.pcos().toString()).toBe('-3/5')
})

test('pcos(3) = -4/5', () => {
  const a = new Rat(3)
  expect(a.pcos().toString()).toBe('-4/5')
})

test('ptan(0) = 0', () => {
  const a = new Rat(0)
  expect(+a.ptan()).toBe(0)
})

test('ptan(1) = Infinity', () => {
  const a = new Rat(1)
  expect(+a.ptan()).toBe(Infinity)
})

test('ptan(-1) = -1/0', () => {
  const a = new Rat(-1)
  expect(a.ptan().toString()).toBe('-1/0')
})

test('ptan(Infinity) = 0', () => {
  const a = floatToRat(Infinity)
  expect(+a.ptan()).toBe(0)
})

test('Mixed fraction of -33/5 is "-6 + -3/5"', () => {
  const a = new Rat(-33, 5)
  expect(a.mixedFractionString()).toBe('-6 + -3/5')
})

test('Continued fraction of 0 is "[0]"', () => {
  const a = new Rat(0)
  expect(a.continuedFractionString()).toBe('[0]')
})

test('Continued fraction of 1 is "[1]"', () => {
  const a = new Rat(1)
  expect(a.continuedFractionString()).toBe('[1]')
})

test('Continued fraction of Infinity is "[]"', () => {
  const a = new Rat(1, 0)
  expect(a.continuedFractionString()).toBe('[]')
})

test('Continued fraction coefficients of 6/9 are [0, 1, 2]', () => {
  const a = new Rat(6, 9)
  const ex = [0, 1, 2]
  const r = []
  for (const n of a.continuedFraction()) {
    r.push(n)
  }
  expect(r).toStrictEqual(ex)
})

test('Continued fraction of 2 is "[2]"', () => {
  const a = new Rat(2)
  expect(a.continuedFractionString()).toBe('[2]')
})

test('Continued fraction of 1/2 is "[0; 2]"', () => {
  const a = new Rat(1, 2)
  expect(a.continuedFractionString()).toBe('[0; 2]')
})

test('Continued fraction of 5/7 is "[0; 1, 2]"', () => {
  const a = new Rat(5, 7)
  expect(a.continuedFractionString()).toBe('[0; 1, 2, 2]')
})

test('Prime factorization of 360 is "2^3 * 3^2 * 5"', () => {
  const a = new Rat(360)
  expect(a.primeFactorizationString()).toBe('2^3 * 3^2 * 5')
})

test('Prime factorization of 36/31 is "2^2 * 3^2 * 31^-1"', () => {
  const a = new Rat(36, 31)
  expect(a.primeFactorizationString()).toBe('2^2 * 3^2 * 31^-1')
})

test('Prime factorization of 53155782/127979960268013673033516151007 is "?"', () => {
  const a = new Rat(53155782n, 127979960268013673033516151007n)
  expect(a.primeFactorizationString()).toBe(
    '2 * 3^2 * 29 * 79 * 433^-1 * 1279^-3 * 1289 * 19387^-4',
  )
})

test('Prime factorization of 17/360 is "2^-3 * 3^-2 * 5^-1 * 17"', () => {
  const a = new Rat(17, 360)
  expect(a.primeFactorizationString()).toBe('2^-3 * 3^-2 * 5^-1 * 17')
})

test('Egyptian fraction for 5/8 is "1/2 + 1/8"', () => {
  const a = new Rat(5, 8)
  expect(a.egyptianFractionString()).toBe('1/2 + 1/8')
})

test('Egyptian fraction for 17/360 is "1/22 + 1/566 + 1/1120680"', () => {
  const a = new Rat(17, 360)
  expect(a.egyptianFractionString()).toBe('1/22 + 1/566 + 1/1120680')
})

test('Egyptian fraction for -1/12 is "-1 + 1/2 + 1/3 + 1/12"', () => {
  const a = new Rat(-1, 12)
  expect(a.egyptianFractionString()).toBe('-1 + 1/2 + 1/3 + 1/12')
})

test('Egyptian fraction for 4096 is as expected', () => {
  const a = new Rat(4096)
  expect(a.egyptianFractionString()).toBe('4096')
})

test('Babylonian fraction for 1/60 is as expected', () => {
  const a = new Rat(1, 60)
  expect(a.babylonianFractionString()).toBe('1 * 60^-1')
})

test('Babylonian fraction for 2/3 is as expected', () => {
  const a = new Rat(2, 3)
  expect(a.babylonianFractionString()).toBe('40 * 60^-1')
})

test('Babylonian fraction for 666/360 is as expected', () => {
  const a = new Rat(666, 360)
  expect(a.babylonianFractionString()).toBe('1 * 60^0 + 51 * 60^-1')
})

test('Babylonian fraction for 181237/10 is "5 * 60^2 + 2 * 60^1 + 3 * 60^0 + 42 * 60^-1"', () => {
  const a = new Rat(181237, 10)
  expect(a.babylonianFractionString()).toBe(
    '5 * 60^2 + 2 * 60^1 + 3 * 60^0 + 42 * 60^-1',
  )
})

test('Babylonian fraction for 420 is as expected', () => {
  const a = new Rat(420)
  expect(a.babylonianFractionString()).toBe('7 * 60^1')
})

test('0.5 is converted to "1/2"', () => {
  const n = 0.5
  expect(floatToRat(n).toString()).toBe('1/2')
})

test('0/0 is converted to "0/0"', () => {
  const n = 0 / 0
  expect(floatToRat(n).toString()).toBe('0/0')
})

test('Not a number is converted to "0/0"', () => {
  const n = 'NaN'
  expect(parseRat(n).toString()).toBe('0/0')
})

test('Infinity is converted to "1/0"', () => {
  const n = Infinity
  expect(floatToRat(n).toString()).toBe('1/0')
})

test('-Infinity is converted to "-1/0"', () => {
  const n = -Infinity
  expect(floatToRat(n).toString()).toBe('-1/0')
})

test('42069 is converted to "42069"', () => {
  const n = 42069
  expect(floatToRat(n).toString()).toBe('42069')
})

test('-1/42069 is converted to "-1/42069"', () => {
  const n = -1 / 42069
  expect(floatToRat(n).toString()).toBe('-1/42069')
})

test('-420/69 converted to a float and back to a Rat is "-140/23"', () => {
  const a = new Rat(-420, 69)
  expect(floatToRat(+a).toString()).toBe('-140/23')
})

test('"Infinity" is converted to "1/0"', () => {
  const n = 'Infinity'
  expect(parseRat(n).toString()).toBe('1/0')
})

test('"-Infinity" is converted to "-1/0"', () => {
  const n = '-Infinity'
  expect(parseRat(n).toString()).toBe('-1/0')
})

test('"420" converted to a Rat is "420"', () => {
  const a = '420'
  expect(parseRat(a).toString()).toBe('420')
})

test('"-420/69" converted to a Rat is "-140/23"', () => {
  const a = '-420/69'
  expect(parseRat(a).toString()).toBe('-140/23')
})

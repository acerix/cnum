import { greatestCommonDenominator, isPrime, primes } from '../src/bigint'

test('Greatest common denominator of 35 and 42', () => {
  const numbers = [35n, 42n]
  expect(Number(greatestCommonDenominator(numbers))).toBe(7)
})

test('Greatest common denominator of 100000 and 10000', () => {
  const numbers = [100000n, 10000n]
  expect(Number(greatestCommonDenominator(numbers))).toBe(10000)
})

test('Greatest common denominator of 15129, 151782, and 1518435', () => {
  const numbers = [15129n, 151782n, 1518435n]
  expect(Number(greatestCommonDenominator(numbers))).toBe(123)
})

// test('Greatest common denominator of 2898, 4761, 28773, 28980, and 85185123', () => {
//   const numbers = [2898n, 4761n, 28773n, 28980n, 85185123n]
//   expect(Number(greatestCommonDenominator(numbers))).toBe(69)
// })

test('Greatest common denominator of 978 and 89798763754892653453379597352537489494736', () => {
  const numbers = [978n, 89798763754892653453379597352537489494736n]
  expect(Number(greatestCommonDenominator(numbers))).toBe(6)
})

test('The number 1 is not prime', () => {
  expect(isPrime(1n)).toBe(false)
})

test('The number 2 is prime', () => {
  expect(isPrime(2n)).toBe(true)
})

test('The number 3 is prime', () => {
  expect(isPrime(3n)).toBe(true)
})

test('The number 4 is not prime', () => {
  expect(isPrime(4n)).toBe(false)
})

test('The number 7919 is prime', () => {
  expect(isPrime(7919n)).toBe(true)
})

test('The number 7911 is not prime', () => {
  expect(isPrime(7911n)).toBe(false)
})

test('The first few primes are as expected', () => {
  const ex = [2, 3, 5, 7, 11]
  const r: number[] = []
  for (const n of primes()) {
    r.push(Number(n))
    if (r.length === ex.length) break
  }
  expect(r).toStrictEqual(ex)
})

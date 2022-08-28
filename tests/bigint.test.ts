import { gcd, isPrime, primes } from '../src/bigint'

test('Greatest commen denominator of 100000 and 10000 is 10000', () => {
  const a = 100000n
  const b = 10000n
  expect(Number(gcd(a, b))).toBe(10000)
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
  const r = []
  for (const n of primes()) {
    r.push(Number(n))
    if (r.length === ex.length) break
  }
  expect(r).toStrictEqual(ex)
})

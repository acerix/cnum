/**
 * Find the greatest common denominator of the two numbers.
 */
export const greatestCommonDenominator = (numbers: Array<bigint>): bigint => {
  if (numbers.length === 1) return numbers[0]

  // only works for 2 numbers
  let a = numbers[0]
  let b = numbers[1]
  while (b !== 0n) {
    const t = a % b
    a = b
    b = t
  }
  return a < 0n ? -a : a

}
export const gcd = greatestCommonDenominator

/**
 * Returns true if the number is prime.
 */
export const isPrime = (n: bigint): boolean => {
  if (n === 1n) return false
  for (let i = 2n; i * i <= n; i++) {
    if (n % i === 0n) return false
  }
  return true
}

/**
 * Yields the prime numbers.
 */
export function* primes(): Generator<bigint> {
  for (let n = 2n; true; n++) {
    if (isPrime(n)) {
      yield n
    }
  }
}

/**
 * Finds the prime factors, returning them in ascending order as arrays with their exponent as the second element.
 */
export const primeFactors = (n: bigint): Array<[bigint, bigint]> => {
  const f: Array<[bigint, bigint]> = []
  for (const p of primes()) {
    let e = 0n
    while (n % p === 0n) {
      e++
      n /= p
    }
    if (e) f.push([p, e])
    if (n === 1n) break
  }
  return f
}

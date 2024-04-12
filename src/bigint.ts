/**
 * Find the greatest common denominator of the two numbers.
 */
export const greatestCommonDenominator = (a: bigint, b: bigint): bigint => {
  if (b === 1n || a === 1n) {
    return 1n
  }
  while (b !== 0n) {
    //[a, b] = [b, a % b] // not pretty???
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

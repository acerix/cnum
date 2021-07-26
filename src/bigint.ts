/**
 * Find the greatest common denominator of the two numbers.
 */
export const gcd = (a: bigint, b: bigint): bigint => {
  if (b === 1n || a === 1n) {
    return 1n
  }
  while (b !== 0n) {
    [a, b] = [b, a % b]
  }
  return a < 0n ? -a : a
}

/**
 * Returns true if the number is prime.
 */
export const isPrime = (n: bigint): boolean => {
  if (n === 1n) return false
  for (let i = 2n; i*i <= n; i++) {
    if (n%i === 0n) return false
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

/**
 * Zero, the additive identity.
 */
export const ZERO = BigInt(0)

/**
 * One, the multiplicative identity.
 */
export const ONE = BigInt(1)

/**
 * Find the greatest common denominator of two integers.
 */
export const gcd = (a: bigint, b: bigint): bigint => {
  if (b === ONE || a === ONE) {
    return ONE
  }
  while (b !== ZERO) {
    [a, b] = [b, a % b]
  }
  return a < ZERO ? -a : a
}

import {gcd} from './bigint'

test('Greatest commen denominator of 100000 and 10000 is 100', () => {
  const a = BigInt(100000)
  const b = BigInt(10000)
  expect(Number(gcd(a, b))).toBe(10000)
})

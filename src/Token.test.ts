import Token from './Token'

test('New Token is the expected type', () => {
  const a = new Token('')
  expect(typeof a).toBe('object')
  expect(a.constructor.name).toBe('Token')
})

test('Text representation of "x" is "identifier(x)"', () => {
  const a = new Token('x')
  expect(a.toString()).toBe('identifier(x)')
})

import Token, { TokenType } from './Token'

test('New Token is the expected type', () => {
  const a = new Token(TokenType.identifier, '')
  expect(typeof a).toBe('object')
  expect(a.constructor.name).toBe('Token')
})

test('Text representation of "x" is "identifier(x)"', () => {
  const a = new Token(TokenType.identifier, 'x')
  expect(a.toString()).toBe('0(x)')
})

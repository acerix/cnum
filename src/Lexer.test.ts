import Lexer from './Lexer'

test('New Lexer is the expected type', () => {
  const a = new Lexer('')
  expect(typeof a).toBe('object')
  expect(a.constructor.name).toBe('Lexer')
})

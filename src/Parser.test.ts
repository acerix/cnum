import Lexer from './Lexer'
import Parser from './Parser'

test('New Parser is the expected type', () => {
  const a = new Parser(new Lexer('').lex())
  expect(typeof a).toBe('object')
  expect(a.constructor.name).toBe('Parser')
})

test('Parse literal', () => {
  const a = new Parser(new Lexer('69').lex())
  expect(Number(a.evaluate())).toBe(69)
})

test('Parse literal with space', () => {
  const a = new Parser(new Lexer(' 69 ').lex())
  expect(Number(a.evaluate())).toBe(69)
})

test('Parser with undefined identifier throws error', () => {
  const a = new Parser(new Lexer('wtf').lex())
  expect(() => {a.evaluate()}).toThrow('"wtf" is undefined')
})

test('Parser with defined identifier returns the value', () => {
  // const a = new Parser(new Lexer('b=69;b').lex())
  const a = new Parser(new Lexer('b').lex())
  a.identifiers['b'] = '69'
  expect(Number(a.evaluate())).toBe(69)
})

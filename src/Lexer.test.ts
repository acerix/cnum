import Lexer from './Lexer'

test('New Lexer is the expected type', () => {
  const a = new Lexer('')
  expect(typeof a).toBe('object')
  expect(a.constructor.name).toBe('Lexer')
})

test('Lex of "   " is an empty string', () => {
  const a = new Lexer('   ')
  const r = []
  for (const t of a.lex()) {
    r.push(t.s)
  }
  expect(r.join('')).toBe('')
})

test('Lex of "1/2" is as expected', () => {
  const a = new Lexer('1/2')
  const r = []
  for (const t of a.lex()) {
    r.push(t.s)
  }
  expect(r.join('')).toBe('1/2')
})

test('Lex of " 1 / 2 " is as expected', () => {
  const a = new Lexer(' 1 / 2 ')
  const r = []
  for (const t of a.lex()) {
    r.push(t.s)
  }
  expect(r.join('')).toBe('1/2')
})

test('Lex of "p/p" is as expected', () => {
  const a = new Lexer('p/p')
  const r = []
  for (const t of a.lex()) {
    r.push(t.s)
  }
  expect(r.join('')).toBe('p/p')
})

test('Lex of "chummy 69 chum" is as expected', () => {
  const a = new Lexer('chummy 69 chum')
  const r = []
  for (const t of a.lex()) {
    r.push(t.s)
  }
  expect(r.join('')).toBe('chummy69chum')
})

test('Lex of "!?*&" throws invalid operator', () => {
  const a = new Lexer('!?*&')
  expect(() => {for (const t of a.lex()) {void(t)} }).toThrow('Invalid operator "!?"')
})

test('Lex of "abc %^" throws invalid operator', () => {
  const a = new Lexer('abc %^')
  expect(() => {for (const t of a.lex()) {void(t)} }).toThrow('Invalid operator "%^"')
})

test('Lex of "zzzz420" is "zzzz420"', () => {
  const a = new Lexer('zzzz420')
  const r = []
  for (const t of a.lex()) {
    r.push(t.s)
  }
  expect(r.join('')).toBe('zzzz420')
})

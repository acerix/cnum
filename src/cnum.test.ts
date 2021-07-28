import cnum, {Rat, Polyrat} from './cnum'

test('Version matches semver format', () => {
  // @from https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
  const serverRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
  expect(cnum.version).toEqual(expect.stringMatching(serverRegex))
})

test('Evaluation of "1" is "1"', () => {
  expect(cnum.evaluate('1')).toBe('1')
})

test('Evaluation of "wtf" throws undefined error', () => {
  expect(() => {cnum.evaluate('wtf')}).toThrow('"wtf" is undefined')
})

test('New Rat from main is the expected type', () => {
  const a = new Rat()
  expect(typeof a).toBe('object')
  expect(a.constructor.name).toBe('Rat')
})

test('New Polyrat from main is the expected type', () => {
  const a = new Polyrat()
  expect(typeof a).toBe('object')
  expect(a.constructor.name).toBe('Polyrat')
})

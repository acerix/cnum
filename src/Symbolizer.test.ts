import Symbolizer from './Symbolizer'

test('New Symbolizer is the expected type', () => {
  const a = new Symbolizer()
  expect(typeof a).toBe('object')
  expect(a.constructor.name).toBe('Symbolizer')
})

test('Default symbolizer generates "αβγδεζηθικλμνξοπρςστυφχψω"', () => {
  const a = new Symbolizer()
  const g = a.generator()
  const x = 'αβγδεζηθικλμνξοπρςστυφχψω'
  let s = ''
  for (let i=0; i<x.length; i++) {
    s += g.next().value
  }
  expect(s).toBe(x)
})

test('Custom symbolizer generates as specified, followed by default symbols', () => {
  const a = new Symbolizer('xyzw')
  const g = a.generator()
  const x = 'xyzwαβγδ'
  let s = ''
  for (let i=0; i<x.length; i++) {
    s += g.next().value
  }
  expect(s).toBe(x)
})

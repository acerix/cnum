#!/usr/bin/env node
import cnum from './main'

console.log(`cnum v${cnum.version}`)

if (process.argv.length > 2) {
  const engine = process.argv.shift()
  const script = process.argv.shift()
  const input = process.argv.join(' ')
  console.log('E', engine, 'S', script, 'I', input)
}
else {
  console.log('?')
}

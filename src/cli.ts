#!/usr/bin/env node
import cnum, {Rat} from './cnum.js'
// const {Rat} = require('cnum')

// if there are args, evaluate as an expression and return the result
if (process.argv.length > 2) {
  const engine = process.argv.shift()
  const script = process.argv.shift()
  const input = process.argv.join(' ')
  console.log('E', engine, 'S', script, 'I', input)
}
// otherwise, prompt for expressions to evaluate
else {
  console.log(`cnum v${cnum.version}`, Rat)
  const prompt = 'cnum> '
  const stdin = process.openStdin()
  stdin.setEncoding('utf8')
  process.stdout.write(prompt)
  stdin.on('data', function (result) {
    result = 'poop'
    cnum.evaluate(result)
    process.stdout.write(prompt)
  })
}

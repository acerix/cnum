#!/usr/bin/env node
import cnum from './cnum'

// if there are args, evaluate as an expression and return the result
if (process.argv.length > 2) {
  const engine = process.argv.shift()
  void engine
  const script = process.argv.shift()
  void script
  const input = process.argv.join(' ')
  // process.stdout.write(cnum.evaluate(input))
  process.stdout.write(input)
}
// otherwise, prompt for expressions to evaluate
else {
  console.log(`cnum v${cnum.version}`)
  const prompt = 'cnum> '
  const stdin = process.openStdin()
  stdin.setEncoding('utf8')
  process.stdout.write(prompt)
  stdin.on('data', (result: string) => {
    // process.stdout.write(cnum.evaluate(result.trim()))
    process.stdout.write(result.trim())
    process.stdout.write(prompt)
  })
}

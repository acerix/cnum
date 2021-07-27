#!/usr/bin/env node
import cnum from './cnum'

// if there are args, evaluate as an expression and return the result
if (process.argv.length > 2) {
  const engine = process.argv.shift()
  void(engine)
  const script = process.argv.shift()
  void(script)
  const input = process.argv.join(' ')
  console.log(cnum.evaluate(input))
}
// otherwise, prompt for expressions to evaluate
else {
  console.log(`cnum v${cnum.version}`)
  const prompt = 'cnum> '
  const stdin = process.openStdin()
  stdin.setEncoding('utf8')
  process.stdout.write(prompt)
  stdin.on('data', function (result) {
    console.log(cnum.evaluate(result))
    process.stdout.write(prompt)
  })
}

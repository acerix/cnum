#!/usr/bin/env node
import cnum, {Rat} from './main'

console.log(`cnum v${cnum.version} (cli)`)

module.exports = {
  cnum: cnum,
  Rat: Rat
}
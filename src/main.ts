import cnum from './cnum'
import Rat, {floatToRat, parseRat} from './Rat'
import Polyrat from './Polyrat'

module.exports = {
  cnum: cnum,
  Rat: Rat,
  floatToRat: floatToRat,
  parseRat: parseRat,
  Polyrat: Polyrat
}

export default cnum
export {Rat, floatToRat, parseRat} from './Rat'
export {Polyrat} from './Polyrat'

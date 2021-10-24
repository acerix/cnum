import cnum from './cnum'
import Rat, {floatToRat, stringToRat} from './Rat'
import Polyrat from './Polyrat'

module.exports = {
  cnum: cnum,
  Rat: Rat,
  floatToRat: floatToRat,
  stringToRat: stringToRat,
  Polyrat: Polyrat
}

export default cnum
export {Rat, floatToRat, stringToRat} from './Rat'
export {Polyrat} from './Polyrat'

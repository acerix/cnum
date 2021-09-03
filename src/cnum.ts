import VERSION from './version'
import Lexer from './Lexer'
import Parser from './Parser'

/**
 * @class Comfortably Numbers
 * @name cnum
 */
class cnum {

  static get version(): string {
    return VERSION
  }

  static evaluate(expression: string): string {
    const lexer = new Lexer(expression)
    const parser = new Parser(lexer.lex())
    return parser.toString()
  }
}

export default cnum
export {Rat, floatToRat, stringToRat} from './Rat'
export {Polyrat} from './Polyrat'

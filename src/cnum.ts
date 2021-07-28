import Lexer from './Lexer'
import Parser from './Parser'

/**
 * @class Comfortably Numbers
 * @name cnum
 */
class cnum {

  static get version(): string {
    return '0.0.11'
  }

  static evaluate(expression: string): string {
    const lexer = new Lexer(expression)
    const parser = new Parser(lexer.lex())
    return parser.toString()
  }
}

export default cnum
export {Rat} from './Rat'
export {Polyrat} from './Polyrat'

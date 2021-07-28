import Lexer from './Lexer'

/**
 * @class Comfortably Numbers
 * @name cnum
 */
class cnum {

  static get version(): string {
    return '0.0.11'
  }

  // @todo some lexer/parser system like calc
  static evaluate(expression: string): string {
    if (expression === '1') {
      return '1'
    }
    const lexer = new Lexer(expression)
    for (const t of lexer.tokens()) {
      console.log(t)
    }
    // return StringToRat(expression).profile
    throw `"${expression}" is undefined`
  }
  
}

export default cnum
export {Rat} from './Rat'
export {Polyrat} from './Polyrat'

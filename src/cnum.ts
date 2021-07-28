// import {StringToRat} from './Rat'

/**
 * @class Comfortably Numbers
 * @name cnum
 */
class cnum {

  static get version(): string {
    return '0.0.10'
  }

  // @todo some lexer/parser system like calc
  static evaluate(expression: string): string {
    if (expression === '1') {
      return '1'
    }
    // return StringToRat(expression).profile
    throw `"${expression}" is undefined`
  }
  
}

export default cnum
// export {Rat} from './Rat'
// export {Polyrat} from './Polyrat'

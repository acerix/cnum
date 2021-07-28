import { Token } from "./Token"

/**
 * @class Lexer
 * @name Lexer
 */
export class Lexer {
  s: string

  /**
   * Initialize a lexer.
   */
  constructor(input: string) {
    this.s = input
  }

  /**
   * Yields tokens as they are parsed.
   * 
   */
  *tokens(): Generator<Token> {
    for (let i=0; i<this.s.length; i++) {
      yield new Token(this.s[i])
    }
  }

}

export default Lexer

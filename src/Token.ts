export const enum TokenType {
  identifier,
  keyword,
  separator,
  operator,
  literal,
  comment
}

/**
 * @class Token
 * @name Token
 */
export class Token {
  type: TokenType
  s: string

  /**
   * Initialize a token.
   */
  constructor(type: TokenType, s: string) {
    this.type = type
    this.s = s
  }
  
  /**
   * The text representation.
   */
  toString(): string {
    return `${this.type}(${this.s})`
  }

}

export default Token

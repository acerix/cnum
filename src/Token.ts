/**
 * @class Token
 * @name Token
 */
export class Token {
  type: string
  s: string

  /**
   * Initialize a token.
   */
  constructor(input: string) {
    this.s = input
    this.type = 'identifier' // identifier, keyword, separator, operator, literal, comment
  }
  
  /**
   * The text representation.
   */
  toString(): string {
    return `${this.type}(${this.s})`
  }

}

export default Token

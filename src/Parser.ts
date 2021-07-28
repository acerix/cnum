import { Token, TokenType } from "./Token"

interface Identifiers<T> {
  [Key: string]: T;
}

/**
 * @class Parser
 * @name Parser
 */
export class Parser {
  tokens: Generator<Token>
  identifiers: Identifiers<string> = {}

  /**
   * Initialize a parser from a token generator.
   */
  constructor(tokens: Generator<Token>) {
    this.tokens = tokens
  }

  /**
   * Evaluate the result.
   */
  evaluate(): bigint {
    let n = 0n
    for(const x of this.tokens) {
      if (x.type === TokenType.identifier) {
        if (!(x.s in this.identifiers)) {
          throw `"${x.s}" is undefined`
        }
        n += BigInt(this.identifiers[x.s])
      }
      // else if (x.type === TokenType.separator) {
      // }
      // else if (x.type === TokenType.operator) {
      //   if (x.s === '=') {
      //   }
      // }
      else if (x.type === TokenType.literal) {
        n += BigInt(x.s)
      }
    }
    return n
  }

  /**
   * The text representation.
   */
  toString(): string {
    return this.evaluate().toString()
  }

}

export default Parser

import Token, { TokenType } from './Token'

const OPERATORS = {
  '+': 'add',
  '-': 'sub',
  '*': 'mul',
  '/': 'div',
  '**': 'pow',
  '^': 'pow',
  '=': 'set',
  '==': 'equals',
  '<': 'isLessThan',
  '>': 'isGreaterThan'
}

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
   * Yields tokens as they are lexed.
   * 
   */
  *lex(): Generator<Token> {
    let onSpace = false
    let onInteger = false
    let onWord = false
    let onOperator = false
    let buffer = ''
    
    // for each character
    for (let i=0; i<this.s.length; i++) {
      const char = this.s[i]

      // if a space, combine with subsequent spaces into a separator
      if (/^\s$/.exec(char)) {
        if (onInteger) {
          yield new Token(TokenType.literal, buffer)
          onInteger = false
          buffer = ''
        }
        else if (onWord) {
          yield new Token(TokenType.identifier, buffer)
          onWord = false
          buffer = ''
        }
        onSpace = true
        buffer += char
        continue
      }
      else if (onSpace) {
        yield new Token(TokenType.separator, '')
        onSpace = false
        buffer = ''
      }

      // if a digit, combine with subsequent digits into a literal
      if (/^\d$/.exec(char)) {
        if (!onWord) {
          onInteger = true
        }
        buffer += char
        continue
      }
      else if (onInteger) {
        yield new Token(TokenType.literal, buffer)
        onInteger = false
        buffer = ''
      }

      // if a letter, combine with subsequent letters/numbers into an identifier
      if (/^[a-z]$/.exec(char) || (onWord && /^\d$/.exec(char))) {
        onWord = true
        buffer += char
        continue
      }
      else if (onWord) {
        yield new Token(TokenType.identifier, buffer)
        onWord = false
        buffer = ''
      }

      // if another char, combine with subsequent char and match an operator
      buffer += char
      if (buffer in OPERATORS) {
        yield new Token(TokenType.operator, buffer)
        onOperator = false
        buffer = ''
        continue
      }
      if (onOperator) {
        throw `Invalid operator "${buffer}"`
      }
      onOperator = true

    }

    if (onSpace) {
      yield new Token(TokenType.separator, '')
    }

    if (onInteger) {
      yield new Token(TokenType.literal, buffer)
    }

    if (onWord) {
      yield new Token(TokenType.identifier, buffer)
    }

  }

}

export default Lexer

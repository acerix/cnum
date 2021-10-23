/**
 * @class Symbolizer
 * @name Symbolizer
 */
export class Symbolizer {
  symbols: string[] = []

  /**
   * Initialize a symbolizer.
   */
  constructor(symbols?: string) {
    if (symbols) this.symbols = symbols.split('')
  }
  
  /**
   * Symbol generator.
   */
  *generator(): Generator<string> {
    for (let i=0;;i++) {
      if (i < this.symbols.length) {
        yield this.symbols[i]
      }
      else {
        yield String.fromCharCode(945 + i - this.symbols.length)
      }
    }
  }
}

export default Symbolizer

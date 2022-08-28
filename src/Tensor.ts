export type TensorInput = Array<TensorInput | bigint>

/**
 * Find the number of dimensions of the array.
 */
export const arrayDepth = (a: TensorInput): number => {
  let i = 0
  for (let current = a; Array.isArray(current[0]); i++) {
    current = current[0]
  }
  return i
}

/**
 * @class A tensor representing an immutable, multidimensional array of numbers with a defined shape and data type.
 * @name Tensor
 */
export class Tensor {
  values: bigint[] = []
  shape: [number, number]

  /**
   * Initialize a tensor.
   */
  constructor(values: TensorInput, shape?: [number, number]) {
    this.shape = shape ?? [values.length, arrayDepth(values)]
    for (let i = 0; i < this.shape[0]; i++) {
      // const row = []
      // for (let j=0; j<this.shape[1]; j++) {
      //   // row.push(values[i][j])
      // }
      this.values.push(0n)
    }
  }

  /**
   * The value.
   */
  valueOf(): number {
    return this.values.length
  }

  /**
   * The text representation.
   */
  toString(): string {
    return this.values.toString()
  }
}

export default Tensor

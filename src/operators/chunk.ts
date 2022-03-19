import { Operator } from '../core/types'


/**
 * @short
 * *Chunk* iterable into tuples.
 *
 * @categories
 * operator
 *
 * @description
 * Creates an iterable of elements split into tuples (arrays) of the provided
 * length. The last tuple can be shorter if the iterable size is not a multiple
 * of chunk size.
 *
 * @parameter
 * chunkSize
 * number
 * Size of a chunk tuple.
 *
 * @returns
 * Operator<T, Array<T>>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4, 5],
 *   j.chunk(2),
 * )
 * // => [[1, 2], [3, 4], [5]]
 */
export function chunk<T> (chunkSize: number): Operator<T, Array<T>> {

  if (!Number.isInteger(chunkSize)) throw new Error(`Chunk size must be an integer.`)
  if (chunkSize < 1) throw new Error(`Chunk size must be at least 1.`)

  return function *(iterable: Iterable<T>): Iterable<Array<T>> {
    const buffer: Array<T> = []
    let count: number = 0
    for (const item of iterable) {
      buffer.push(item)
      count++
      if (count == chunkSize) {
        yield [...buffer]
        buffer.splice(0, buffer.length)
        count = 0
      }
    }
    yield buffer
  }

}
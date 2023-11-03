import { Operator } from '../core/types'


/**
 * @short
 * *Chunk* an iterable into tuples.
 *
 * @categories
 * operator
 *
 * @description
 * Creates an iterable of elements split into tuples (arrays) of the provided
 * length. The last tuple can be shorter if the iterable size is not a multiple
 * of chunk size.
 *
 * This is a specialization of {@link segmentizeBy}.
 *
 * @parameter
 * chunkSize
 * number
 * Size of a chunk tuple.
 *
 * @returns
 * Operator<T, Array<T>>
 *
 * @throws
 * `RangeError` when the given `chunkSize` parameter is not an integer, or is less than one.
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.chunk(2),
 * )
 * // => [[1, 2], [3, 4]]
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4, 5],
 *   j.chunk(2),
 * )
 * // => [[1, 2], [3, 4], [5]]
 */
export function chunk<T> (chunkSize: number): Operator<T, Array<T>> {

  if (!Number.isInteger(chunkSize) || chunkSize < 1) {
    throw new RangeError(`Chunk size must be an integer not less than 1; an attempt was made to define the chunk size as ${chunkSize}.`)
  }

  return function *(iterable: Iterable<T>): IterableIterator<Array<T>> {
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
    if (buffer.length > 0) {
      yield buffer
    }
  }

}

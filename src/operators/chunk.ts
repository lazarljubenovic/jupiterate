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
export function chunk<T> (chunkSize: 1): Operator<T, [T]>
export function chunk<T> (chunkSize: 2): Operator<T, [T] | [T, T]>
export function chunk<T> (chunkSize: 3): Operator<T, [T] | [T, T] | [T, T, T]>
export function chunk<T> (chunkSize: 4): Operator<T, [T] | [T, T] | [T, T, T] | [T, T, T, T]>
export function chunk<T> (chunkSize: 5): Operator<T, [T] | [T, T] | [T, T, T] | [T, T, T, T] | [T, T, T, T, T]>
export function chunk<T> (chunkSize: 6): Operator<T, [T] | [T, T] | [T, T, T] | [T, T, T, T] | [T, T, T, T, T] | [T, T, T, T, T, T]>
export function chunk<T> (chunkSize: 7): Operator<T, [T] | [T, T] | [T, T, T] | [T, T, T, T] | [T, T, T, T, T] | [T, T, T, T, T, T] | [T, T, T, T, T, T, T]>
export function chunk<T> (chunkSize: 8): Operator<T, [T] | [T, T] | [T, T, T] | [T, T, T, T] | [T, T, T, T, T] | [T, T, T, T, T, T] | [T, T, T, T, T, T, T] | [T, T, T, T, T, T, T, T]>
export function chunk<T> (chunkSize: 9): Operator<T, [T] | [T, T] | [T, T, T] | [T, T, T, T] | [T, T, T, T, T] | [T, T, T, T, T, T] | [T, T, T, T, T, T, T] | [T, T, T, T, T, T, T, T] | [T, T, T, T, T, T, T, T, T]>
export function chunk<T> (chunkSize: 10): Operator<T, [T] | [T, T] | [T, T, T] | [T, T, T, T] | [T, T, T, T, T] | [T, T, T, T, T, T] | [T, T, T, T, T, T, T] | [T, T, T, T, T, T, T, T] | [T, T, T, T, T, T, T, T, T] | [T, T, T, T, T, T, T, T, T, T]>
export function chunk<T> (chunkSize: number): Operator<T, Array<T>>
export function chunk<T> (chunkSize: number): Operator<T, Array<T>> {

  if (!Number.isInteger(chunkSize) || chunkSize < 1) {
    throw new RangeError(`Chunk size must be an integer not less than 1; an attempt was made to define the chunk size as ${chunkSize}.`)
  }

  return function* (iterable: Iterable<T>): IterableIterator<Array<T>> {
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

/**
 * @short
 * *Chunk* an iterable into tuples of *strictly* defined sizes.
 *
 * @categories
 * operator
 *
 * @description
 * Creates an iterable of elements split into tuples (arrays) of the provided
 * length. If the element count of the source iterable is such that it's not
 * possible for the last tuple to be of the specified size, an error will be
 * thrown.
 *
 * Note that, even when an error is thrown, the source iterable will be fully
 * consumed and all the valid chunks will have been yielded already.
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
 * // => [[1, 2], [3, 4], Error
 */
export function chunkStrict<T> (chunkSize: 1): Operator<T, [T]>
export function chunkStrict<T> (chunkSize: 2): Operator<T, [T, T]>
export function chunkStrict<T> (chunkSize: 3): Operator<T, [T, T, T]>
export function chunkStrict<T> (chunkSize: 4): Operator<T, [T, T, T, T]>
export function chunkStrict<T> (chunkSize: 5): Operator<T, [T, T, T, T, T]>
export function chunkStrict<T> (chunkSize: 6): Operator<T, [T, T, T, T, T, T]>
export function chunkStrict<T> (chunkSize: 7): Operator<T, [T, T, T, T, T, T, T]>
export function chunkStrict<T> (chunkSize: 8): Operator<T, [T, T, T, T, T, T, T, T]>
export function chunkStrict<T> (chunkSize: 9): Operator<T, [T, T, T, T, T, T, T, T, T]>
export function chunkStrict<T> (chunkSize: 10): Operator<T, [T, T, T, T, T, T, T, T, T, T]>
export function chunkStrict<T> (chunkSize: number): Operator<T, Array<T>>
export function chunkStrict<T> (chunkSize: number): Operator<T, Array<T>> {

  if (!Number.isInteger(chunkSize) || chunkSize < 1) {
    throw new RangeError(`Chunk size must be an integer not less than 1; an attempt was made to define the chunk size as ${chunkSize}.`)
  }

  return function* (iterable: Iterable<T>): IterableIterator<Array<T>> {
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
      throw new Error(`Chunk size was defined as ${chunkSize}, but the source iterable ends with ${buffer.length} items that cannot be collected into a chunk of the specified size.`)
    }
  }

}

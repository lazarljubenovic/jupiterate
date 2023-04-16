import { Operator } from '../core/types'


/**
 * @short
 * Get *pairwise* adjacent values.
 *
 * @categories
 * operator no-parameters
 *
 * @description
 * Instead of iterating value by value from the source iterator, the resulting
 * iterator will yield pairs of values: first and second, second and third,
 * third and fourth, fourth and fifth, and so forth.
 *
 * Empty iterator and an iterator with a single value will both result in an
 * empty iterator.
 *
 * @returns
 * Operator<T, [T, T]>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4, 5],
 *   j.pairwise(),
 * )
 * // => [[1, 2], [2, 3], [3, 4], [4, 5]]
 *
 * @example
 * j.pipe(
 *   [1],
 *   j.pairwise(),
 * )
 * // => []
 *
 * @example
 * j.pipe(
 *   [],
 *   j.pairwise(),
 * )
 * // => []
 */
export function pairwise<T> (): Operator<T, [T, T]> {
  return function *(iterable: Iterable<T>): IterableIterator<[T, T]> {
    let prev: T
    let isFirst = true
    for (const value of iterable) {
      if (!isFirst) {
        yield [prev!, value]
      }
      prev = value
      isFirst = false
    }
  }
}

/**
 * @short
 * Get *pairwise* values in a *cyclic* manner.
 *
 * @categories
 * operator no-parameters
 *
 * @description
 * Instead of iterating value by value from the source iterator, the resulting
 * iterator will yield pairs of values: first and second, second and third,
 * third and fourth, fourth and fifth, and so forth. Additionally, the last
 * yielded pair will consist of the last and the first value of the source
 * iterator.
 *
 * @returns
 * Operator<T, [T, T]>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4, 5],
 *   j.pairwiseCyclic(),
 * )
 * // => [[1, 2], [2, 3], [3, 4], [4, 5], [5, 1]]
 *
 * @example
 * j.pipe(
 *   [1],
 *   j.pairwiseCyclic(),
 * )
 * // => [[1, 1]]
 *
 * @example
 * j.pipe(
 *   [],
 *   j.pairwiseCyclic(),
 * )
 * // => []
 */
export function pairwiseCyclic<T> (): Operator<T, [T, T]> {
  return function *(iterable: Iterable<T>): IterableIterator<[T, T]> {
    let prev: T
    let first: T
    let isFirst = true
    let isNonZero = false
    for (const value of iterable) {
      isNonZero = true
      if (!isFirst) {
        yield [prev!, value]
      } else {
        first = value
      }
      prev = value
      isFirst = false
    }
    if (isNonZero) {
      yield [prev!, first!]
    }
  }
}

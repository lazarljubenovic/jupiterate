import { Operator } from '../core/types'


/**
 * @short
 * *End* iterable *with* additional yielded values.
 *
 * @categories
 * operator
 *
 * @description
 * After the iterable is done yielding values, several additional values listed
 * as arguments of this operator will be yielded further.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * ...values
 * ...Array<T>
 * The values to yield after the iterable is done.
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.endWith(5),
 * )
 * // => [1, 2, 3, 4, 5]
 *
 * @example
 * j.pipe(
 *   [2, 4, 6],
 *   j.endWith(8, 10),
 * )
 * // => [2, 4, 6, 8, 10]
 */
export function endWith<T> (...values: Array<T>): Operator<T, T> {
  return function* (iterable: Iterable<T>): IterableIterator<T> {
    yield *iterable
    yield *values
  }
}
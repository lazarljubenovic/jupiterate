import { Operator } from '../core/types'


/**
 * @short
 * *Start* iterable *with* additional yielded values.
 *
 * @categories
 * operator
 *
 * @description
 * Before the source iterable starts yielding its own values, several additional
 * values listed as arguments of this operator will be yielded.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * ...values
 * ...Array<T>
 * The values to yield before the source iterable starts yielding its own values.
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.startWith(0),
 * )
 * // => [0, 1, 2, 3, 4]
 *
 * @example
 * j.pipe(
 *   [6, 8, 10],
 *   j.startWith(2, 4),
 * )
 * // => [2, 4, 6, 8, 10]
 */
export function startWith<T> (...values: Array<T>): Operator<T, T> {
  return function* (iterable: Iterable<T>): IterableIterator<T> {
    yield *values
    yield *iterable
  }
}
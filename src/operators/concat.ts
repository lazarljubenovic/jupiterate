import { Operator } from '../core/types'


/**
 * @short
 * *Concatenate* iterables to the source.
 *
 * @categories
 * operator accepts-iterables
 *
 * @description
 * Prolongs the source iterable by yielding values from provided iterables,
 * in the order they're given.
 *
 * @parameter
 * ...otherIterables
 * Array<Iterable<T>>
 * Iterables to concatenate to the source.
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [1, 2],
 *   j.Concat([3, 4]),
 * )
 * // => [1, 2, 3, 4]
 *
 * @example
 * j.pipe(
 *   [1],
 *   j.Concat([2], [3], [4]),
 * )
 * // => [1, 2, 3, 4]
 */
export function concat<T> (...otherIterables: Array<Iterable<T>>): Operator<T, T> {
  return function *(iterable: Iterable<T>): IterableIterator<T> {
    yield *iterable
    for (const otherIterable of otherIterables) {
      yield *otherIterable
    }
  }
}

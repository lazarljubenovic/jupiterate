import { Operator } from '../core/types'


/**
 * @short
 * *Reverse* the iterable.
 *
 * @categories
 * operator trigger
 *
 * @description
 * Takes all values of the iterable, and then yields them in reverse.
 *
 * @returns
 * Iterable<T>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.reverse(),
 * )
 * // => [4, 3, 2, 1]
 *
 * @example
 * j.pipe(
 *   'live',
 *   j.reverse(),
 * )
 * // => 'evil'
 */
export function reverse<T> (): Operator<T, T> {
  return function *(iterable: Iterable<T>): IterableIterator<T> {
    const array = Array.from(iterable)
    array.reverse()
    yield *array
  }
}

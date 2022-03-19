import { Ender } from '../core/types'


/**
 * @short
 * *Count* yielded values.
 *
 * @categories
 * ender
 *
 * @description
 * Return the number of values yielded from the iterable.
 *
 * Be careful not to pass in an infinite iterator.
 *
 * @returns
 * Ender<T, number>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.e.count(),
 * )
 * // => 4
 *
 * @example
 * j.pipe(
 *   [],
 *   j.e.count(),
 * )
 * // => 0
 *
 * @example
 * j.pipe(
 *   j.g.integers(),
 *   j.e.count(),
 * )
 * // Stack overflow error
 */
export function count<T> (): Ender<T, number> {
  return function (iterable: Iterable<T>): number {
    let count = 0
    for (const item of iterable) {
      count++
    }
    return count
  }
}

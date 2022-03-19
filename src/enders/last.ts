import { Ender } from '../core/types'


/**
 * @short
 * Get *last* value.
 *
 * @categories
 * ender
 *
 * @description
 * Iterate through the iterable and return the last yielded value. If the
 * iterable is empty, `undefined` is returned.
 *
 * @returns
 * Ender<T, T | undefined>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.e.last(),
 * )
 * // => 4
 *
 * @example
 * j.pipe(
 *   [],
 *   j.e.last(),
 * )
 * // => undefined
 */
export function last<T> (): Ender<T, T | undefined> {
  return function (iterable: Iterable<T>): T | undefined {
    let current: T | undefined
    for (const item of iterable) {
      current = item
    }
    return current
  }
}

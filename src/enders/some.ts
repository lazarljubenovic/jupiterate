import { Ender } from '../core/types'


/**
 * @short
 * Check if the given predicate holds for *some* yielded values.
 *
 * @categories
 * ender predicate-based
 *
 * @description
 * Check each yielded value from the source iterable using the given predicate
 * function until the first one is found which satisfies the condition.
 *
 * Similar to `Array#some`.
 *
 * @parameter
 * predicate
 * (t: T) => boolean
 * The function used for the check.
 *
 * @returns
 * Ender<T, boolean>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4, 5],
 *   j.e.some(x => x % 2 == 0),
 * )
 * // => true
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4, 5],
 *   j.e.some(x => x > 10),
 * )
 * // => false
 */
export function some<T> (predicate: (t: T) => boolean): Ender<T, boolean> {
  return function (iterable: Iterable<T>): boolean {
    for (const item of iterable) {
      if (predicate(item)) return true
    }
    return false
  }
}

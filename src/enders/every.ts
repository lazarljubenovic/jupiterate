import { Ender } from '../core/types'

/**
 * @short
 * Check if *every* value satisfies a condition.
 *
 * @categories
 * ender
 *
 * @description
 * Check each value yielded from the iterator against the provided condition.
 * As long as the condition is satisfied, keep iterating. If a value which
 * doesn't satisfy the condition is found, `false` is immediately returned.
 * When the iterator is completed, return `true`.
 *
 * @parameter
 * condition
 * (t: T) => boolean
 * The condition applied to yielded values.
 *
 * @returns
 * Ender<T, boolean>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.e.every(x => x > 0),
 * )
 * // true
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.e.every(x => x % 2 == 0),
 * )
 * // false
 */
export function every<T> (condition: (t: T) => boolean): Ender<T, boolean> {
  return function (iterable: Iterable<T>): boolean {
    for (const item of iterable) {
      if (condition(item)) continue
      return false
    }
    return true
  }
}

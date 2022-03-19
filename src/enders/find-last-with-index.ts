import { Ender } from '../core/types'


/**
 * @short
 * *Find value and index* of the *last* occurrence of a value according to
 * some criteria.
 *
 * @categories
 * ender index trigger
 *
 * @description
 * Check each value yielded from the iterator against the provided condition.
 * The last value which happens to satisfy the condition is returned, along with
 * its index. If the iterator completes before reaching such value, `null` is
 * returned.
 *
 * @parameter
 * condition
 * (t: T, i: number) => boolean
 * The criteria used to find a value.
 *
 * @returns
 * Ender<T, { value: T, index: number } | null>
 *
 * @example
 * j.pipe(
 *   [a, b, c, d],
 *   j.e.findLastWithIndex(x => x == b),
 * )
 * // => { value: b, index: 1 }
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.e.findLastWithIndex(x => x == 6),
 * )
 * // => null
 *
 * @example
 * j.pipe(
 *   [-2, -1, 0, 1, 2, 3],
 *   j.e.findLastIndexWithIndex(x => x > 0),
 * )
 * // => { value: 3, index: 5 }
 */
export function findLastWithIndex<T> (
  condition: (t: T, i: number) => boolean,
): Ender<T, { value: T, index: number } | null> {
  return function (iterable: Iterable<T>): { value: T, index: number } | null {
    let index = 0
    let foundIndex = -1
    let foundValue: T | undefined
    for (const item of iterable) {
      if (condition(item, index)) {
        foundIndex = index
        foundValue = item
      }
      index++
    }
    if (foundIndex == -1) {
      return null
    } else {
      return { value: foundValue!, index: foundIndex }
    }
  }
}

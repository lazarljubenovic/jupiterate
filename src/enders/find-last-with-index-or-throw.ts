import { Ender } from '../core/types'


/**
 * @short
 * *Find value and index* of the *last* occurrence of a value according to
 * some criteria, or throw.
 *
 * @categories
 * ender index trigger
 *
 * @description
 * Check each value yielded from the iterator against the provided condition.
 * The last value which happens to satisfy the condition is returned, along with
 * its index. If the iterator completes before reaching such value, an error
 * is thrown.
 *
 * @parameter
 * condition
 * (t: T, i: number) => boolean
 * The criteria used to find a value.
 *
 * @returns
 * Ender<T, { value: T, index: number }>
 *
 * @example
 * j.pipe(
 *   [a, b, c, d],
 *   j.e.findLastWithIndexOrThrow(x => x == b),
 * )
 * // => { value: b, index: 1 }
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.e.findLastWithIndexOrThrow(x => x == 6),
 * )
 * // => Error
 *
 * @example
 * j.pipe(
 *   [-2, -1, 0, 1, 2, 3],
 *   j.e.findLastWithIndexOrThrow(x => x > 0),
 * )
 * // => { value: 3, index: 5 }
 */
export function findLastWithIndexOrThrow<T> (
  condition: (t: T, i: number) => boolean,
): Ender<T, { value: T, index: number }> {
  return function (iterable: Iterable<T>): { value: T, index: number } {
    let index = 0
    let foundIndex = -1
    let foundItem: T | undefined
    for (const item of iterable) {
      if (condition(item, index)) {
        foundIndex = index
        foundItem = item
      }
      index++
    }
    if (foundIndex == -1) {
      throw new Error(`No element found.`)
    } else {
      return { value: foundItem!, index: foundIndex }
    }
  }
}

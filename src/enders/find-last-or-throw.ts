import { Ender } from '../core/types'


/**
 * @short
 * *Find index* of the **last** occurrence of a value according to some criteria.
 *
 * @categories
 * ender index trigger
 *
 * @description
 * Check each value yielded from the iterator against the provided condition.
 * The index of the last value which happens to satisfy the condition is
 * returned. If the iterator completes before reaching such value, `-1` is
 * returned.
 *
 * If you don't want the ender to throw if no yielded value matches the given
 * criterion, you can use {@link findLast}.
 *
 * @parameter
 * condition
 * (t: T, i: number) => boolean
 * The criteria used to find the index of a value.
 *
 * @returns
 * Ender<T, number>
 *
 * @example
 * j.pipe(
 *   [a, b, c, d],
 *   j.e.findLastOrThrow(x => x == b),
 * )
 * // => b
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.e.findLastOrThrow(x => x == 6),
 * )
 * // => Error
 *
 * @example
 * j.pipe(
 *   [-2, -1, 0, 1, 2, 3],
 *   j.e.findLastOrThrow(x => x > 0),
 * )
 * // => 3
 */
export function findLastOrThrow<T> (condition: (t: T, i: number) => boolean): Ender<T, T> {
  return function (iterable: Iterable<T>): T {
    let index = 0
    let didFind: boolean = false
    let foundItem: T | undefined
    for (const item of iterable) {
      if (condition(item, index)) {
        foundItem = item
        didFind = true
      }
      index++
    }
    if (didFind) return foundItem!
    throw new Error(`Element not found.`)
  }
}

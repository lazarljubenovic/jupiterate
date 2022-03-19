import { Ender } from '../core/types'


/**
 * @short
 * *Find* the *last* occurrence of a value according to some criteria.
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
 * If you expect to find a value satisfying the given condition, you can use
 * {@link findLastOrThrow}. To get the value itself instead its index,
 * check out {@link findLast} or {@link findLastOrThrow}.
 *
 * @parameter
 * condition
 * (t: T, i: number) => boolean
 * The criteria used to find a value. A guard is accepted as well.
 *
 * @returns
 * Ender<T, T| undefined>
 *
 * @example
 * j.pipe(
 *   [a, b, c, d],
 *   j.e.findLast(x => x == b),
 * )
 * // => b
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.e.findLast(x => x == 6),
 * )
 * // => undefined
 *
 * @example
 * j.pipe(
 *   [-2, -1, 0, 1, 2, 3],
 *   j.e.findLast(x => x > 0),
 * )
 * // => 3
 */
export function findLast<T> (condition: (t: T, i: number) => boolean): Ender<T, T | undefined> {
  return function (iterable: Iterable<T>): T | undefined {
    let index = 0
    let foundItem: T | undefined
    for (const item of iterable) {
      if (condition(item, index)) foundItem = item
      index++
    }
    return foundItem
  }
}

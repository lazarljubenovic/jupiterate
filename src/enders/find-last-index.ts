import { Ender } from '../core/types'


/**
 * @short
 * *Find index* of the *last* occurrence of a value according to some criteria.
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
 * {@link findLastIndexOrThrow}. To get the value itself instead its index,
 * check out {@link findLast} or {@link findLastOrThrow}.
 *
 * @parameter
 * condition
 * (t: T, i: number) => boolean
 * The criteria used to find a value. A guard is accepted as well.
 *
 * @returns
 * Ender<T, number>
 *
 * @example
 * j.pipe(
 *   [a, b, c, d],
 *   j.e.findLastIndex(x => x == b),
 * )
 * // => 1
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.e.findLastIndex(x => x == 6),
 * )
 * // => -1
 *
 * @example
 * j.pipe(
 *   [-2, -1, 0, 1, 2, 3],
 *   j.e.findLastIndex(x => x > 0),
 * )
 * // => 5
 */
export function findLastIndex<T> (condition: (t: T, i: number) => boolean): Ender<T, number> {
  return function (iterable: Iterable<T>): number {
    let index = 0
    let foundIndex = -1
    for (const item of iterable) {
      if (condition(item, index)) foundIndex = index
      index++
    }
    return foundIndex
  }
}

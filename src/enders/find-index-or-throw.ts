import { Ender } from '../core/types'


/**
 * @short
 * *Find index* of a value, *or throw* if nothing is found.
 *
 * @categories
 * ender index or-throw
 *
 * @description
 * Check each value yielded from the iterator against the provided condition.
 * The index of the first value which happens to satisfy the condition is
 * returned. If the iterator completes before reaching such value, `-1` is
 * returned.
 *
 * If you expect to find a value satisfying the given condition, you can use
 * {@link findIndexOrThrow}. To get the value itself instead its index, check
 * out {@link find} or {@link findOrThrow}.
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
 *   j.e.findIndex(x => x == b),
 * )
 * // => 1
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.e.findIndex(x => x == 6),
 * )
 * // => -1
 *
 * @example
 * j.pipe(
 *   [-2, -1, 0, 1, 2, 3],
 *   j.e.findIndex(x => x > 0),
 * )
 * // => 3
 */
export function findIndexOrThrow<T> (condition: (t: T, i: number) => boolean): Ender<T, number> {
  return function (iterable: Iterable<T>): number {
    let index = 0
    for (const item of iterable) {
      if (condition(item, index)) return index
      index++
    }
    throw new Error(`Element not found.`)
  }
}

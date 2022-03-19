import { Ender } from '../core/types'


/**
 * @short
 * *Find value and index* of the first occurrence of a value according to
 * some criteria.
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
 * @parameter
 * condition
 * (t: T, i: number) => boolean
 * The criteria used to find a value. A guard is accepted as well.
 *
 * @returns
 * Ender<T, { value: T, index: number } | null>
 *
 * @example
 * j.pipe(
 *   [a, b, c, d],
 *   j.e.findWithIndex(x => x == b),
 * )
 * // => { value: b, index: 1 }
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.e.findWithIndex(x => x == 6),
 * )
 * // => null
 *
 * @example
 * j.pipe(
 *   [-2, -1, 0, 1, 2, 3],
 *   j.e.findWithIndex(x => x > 0),
 * )
 * // => { value: 0, index: 2 }
 */
export function findWithIndex<T> (condition: (
  t: T,
  i: number,
) => boolean): Ender<T, { value: T, index: number } | null> {
  return function (iterable: Iterable<T>): { value: T, index: number } | null {
    let index = 0
    for (const item of iterable) {
      if (condition(item, index)) return { value: item, index }
      index++
    }
    return null
  }
}

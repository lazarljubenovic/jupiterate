/**
 * @short
 * *Find index* of the *last* occurrence of a value according to some criteria.
 *
 * @categories
 * static index trigger
 *
 * @description
 * Check each value yielded from the iterator against the provided condition.
 * The index of the last value which happens to satisfy the condition is
 * returned. If the iterator completes before reaching such value, `-1` is
 * returned.
 *
 * If you expect to find a value satisfying the given condition, you can use
 * {@link FindLastIndexOrThrow}. To get the value itself instead its index,
 * check out {@link FindLast} or {@link FindLastOrThrow}.
 *
 * @parameter
 * condition
 * (t: T, i: number) => boolean
 * The criteria used to find a value. A guard is accepted as well.
 *
 * @returns
 * number
 *
 * @example
 * j.FindLastIndex(
 *   [a, b, c, d],
 *   x => x == b,
 * )
 * // => 1
 *
 * @example
 * j.FindLastIndex(
 *   [1, 2, 3, 4],
 *   x => x == 6,
 * )
 * // => -1
 *
 * @example
 * j.FindLastIndex(
 *   [-2, -1, 0, 1, 2, 3],
 *   x => x > 0,
 * )
 * // => 5
 */
export function FindLastIndex<T> (iterable: Iterable<T>, condition: (t: T, i: number) => boolean): number {
  let index = 0
  let foundIndex = -1
  for (const item of iterable) {
    if (condition(item, index)) foundIndex = index
    index++
  }
  return foundIndex
}

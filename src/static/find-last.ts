/**
 * @short
 * *Find* the *last* occurrence of a value according to some criteria.
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
 * {@link FindLastOrThrow}. To get the value itself instead its index,
 * check out {@link FindLast} or {@link FindLastOrThrow}.
 *
 * @parameter
 * condition
 * (t: T, i: number) => boolean
 * The criteria used to find a value. A guard is accepted as well.
 *
 * @returns
 * T | undefined
 *
 * @example
 * j.FindLast(
 *   [a, b, c, d],
 *   x => x == b,
 * )
 * // => b
 *
 * @example
 * j.FindLast(
 *   [1, 2, 3, 4],
 *   x => x == 6,
 * )
 * // => undefined
 *
 * @example
 * j.FindLast(
 *   [-2, -1, 0, 1, 2, 3],
 *   x => x > 0,
 * )
 * // => 3
 */
export function FindLast<T> (iterable: Iterable<T>, condition: (t: T, i: number) => boolean): T | undefined {
  let index = 0
  let foundItem: T | undefined
  for (const item of iterable) {
    if (condition(item, index)) foundItem = item
    index++
  }
  return foundItem
}

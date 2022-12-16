/**
 * @short
 * *Find index* of the *last* occurrence of a value according to some criteria,
 * *or throw*.
 *
 * @categories
 * static index trigger
 *
 * @description
 * Check each value yielded from the iterator against the provided condition.
 * The index of the last value which happens to satisfy the condition is
 * returned. If the iterator completes before reaching such value, an error
 * is thrown.
 *
 * If you expect to find a value satisfying the given condition, you can use
 * {@link FindIndexOrThrow}. To get the value itself instead its index, check
 * out {@link Find} or {@link FindOrThrow}.
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
 * j.FindLastIndexOrThrow(
 *   [a, b, c, d],
 *   x => x == b,
 * )
 * // => 1
 *
 * @example
 * j.FindLastIndexOrThrow(
 *   [1, 2, 3, 4],
 *   x => x == 6,
 * )
 * // => Error
 *
 * @example
 * j.FindLastIndexOrThrow(
 *   [-2, -1, 0, 1, 2, 3],
 *   x => x > 0,
 * )
 * // => 5
 */
export function FindLastIndexOrThrow<T> (iterable: Iterable<T>, condition: (t: T, i: number) => boolean): number {
  let index = 0
  let foundIndex = -1
  for (const item of iterable) {
    if (condition(item, index)) foundIndex = index
    index++
  }
  if (foundIndex == -1) throw new Error(`Element not found.`)
  return foundIndex
}

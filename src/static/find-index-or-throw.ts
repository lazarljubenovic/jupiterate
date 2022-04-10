/**
 * @short
 * *Find index* of a value, *or throw* if nothing is found.
 *
 * @categories
 * static index or-throw
 *
 * @description
 * Check each value yielded from the iterator against the provided condition.
 * The index of the first value which happens to satisfy the condition is
 * returned. If the iterator completes before reaching such value, `-1` is
 * returned.
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
 * j.FindIndexOrThrow(
 *   [a, b, c, d],
 *   x => x == b,
 * )
 * // => 1
 *
 * @example
 * j.FindIndexOrThrow(
 *   [1, 2, 3, 4],
 *   x => x == 6,
 * )
 * // => Error
 *
 * @example
 * j.FindIndexOrThrow(
 *   [-2, -1, 0, 1, 2, 3],
 *   x => x > 0,
 * )
 * // => 3
 */
export function FindIndexOrThrow<T> (iterable: Iterable<T>, condition: (t: T, i: number) => boolean): number {
  let index = 0
  for (const item of iterable) {
    if (condition(item, index)) return index
    index++
  }
  throw new Error(`Element not found.`) // TODO: Allow customizing this error.
}

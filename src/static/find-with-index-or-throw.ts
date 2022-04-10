/**
 * @short
 * Find value and index* of the first occurrence of a value according to
 * some criteria, or throw.
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
 * @parameter
 * condition
 * (t: T, i: number) => boolean
 * The criteria used to find a value. A guard is accepted as well.
 *
 * @returns
 * number
 *
 * @example
 * j.FindWithIndexOrThrow(
 *   [a, b, c, d],
 *   x => x == b,
 * )
 * // => { value: b, index: 1 }
 *
 * @example
 * j.FindWithIndexOrThrow(
 *   [1, 2, 3, 4],
 *   x => x == 6,
 * )
 * // => Error
 *
 * @example
 * j.FindWithIndexOrThrow(
 *   [-2, -1, 0, 1, 2, 3],
 *   x => x > 0,
 * )
 * // => { value: 0, index: 2 }
 */
export function FindWithIndexOrThrow<T> (
  iterable: Iterable<T>,
  condition: (t: T, i: number) => boolean,
): { value: T, index: number } {
  let index = 0
  for (const item of iterable) {
    if (condition(item, index)) return { value: item, index }
    index++
  }
  throw new Error(`Element not found.`)
}

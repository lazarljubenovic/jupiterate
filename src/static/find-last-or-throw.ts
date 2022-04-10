/**
 * @short
 * *Find index* of the **last** occurrence of a value according to some criteria.
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
 * If you don't want the operator to throw if no yielded value matches the given
 * criterion, you can use {@link FindLast}.
 *
 * @parameter
 * condition
 * (t: T, i: number) => boolean
 * The criteria used to find the index of a value.
 *
 * @returns
 * number
 *
 * @example
 * j.FindLastOrThrow(
 *   [a, b, c, d],
 *   x => x == b,
 * )
 * // => b
 *
 * @example
 * j.FindLastOrThrow(
 *   [1, 2, 3, 4],
 *   x => x == 6,
 * )
 * // => Error
 *
 * @example
 * j.FindLastOrThrow(
 *   [-2, -1, 0, 1, 2, 3],
 *   x => x > 0,
 * )
 * // => 3
 */
export function FindLastOrThrow<T> (iterable: Iterable<T>, condition: (t: T, i: number) => boolean): T {
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

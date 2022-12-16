/**
 * @short
 * Check if the given predicate holds for *some* yielded values.
 *
 * @categories
 * static predicate-based
 *
 * @description
 * Check each yielded value from the source iterable using the given predicate
 * function until the first one is found which satisfies the condition.
 *
 * Similar to `Array#some`.
 *
 * @parameter
 * predicate
 * (t: T) => boolean
 * The function used for the check.
 *
 * @returns
 * boolean
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4, 5],
 *   j.andFinally(j.Some, x => x % 2 == 0),
 * )
 * // => true
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4, 5],
 *   j.andFinally(j.Some, x => x > 10),
 * )
 * // => false
 */
export function Some<T> (iterable: Iterable<T>, predicate: (t: T) => boolean): boolean {
  for (const item of iterable) {
    if (predicate(item)) return true
  }
  return false
}

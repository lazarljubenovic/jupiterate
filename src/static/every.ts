/**
 * @short
 * Check if *every* value satisfies a condition.
 *
 * @categories
 * static trigger
 *
 * @description
 * Check each value yielded from the iterator against the provided condition.
 * As long as the condition is satisfied, keep iterating. If a value which
 * doesn't satisfy the condition is found, `false` is immediately returned.
 * When the iterator is completed, return `true`.
 *
 * @parameter
 * predicate
 * (t: T) => boolean
 * The condition applied to yielded values.
 *
 * @returns
 * boolean
 *
 * @example
 * j.Every([1, 2, 3, 4], x => x > 0)
 * // => true
 *
 * @example
 * j.Every([1, 2, 3, 4], x => x % 2 == 0),
 * // => false
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.andFinally(j.Every, x => x > 0),
 * )
 * // => true
 */
export function Every<T> (iterable: Iterable<T>, predicate: (t: T) => boolean): boolean {
  for (const item of iterable) {
    if (predicate(item)) continue
    return false
  }
  return true
}

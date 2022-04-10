/**
 * @short
 * Get the *first* value *or throw*.
 *
 * @categories
 * static or-throw
 *
 * @description
 * The first value yielded from the source iterator will be immediately returned,
 * and the iterator won't be queried any longer. If the iterator completes before
 * yielding any value, `undefined` is returned.
 *
 * If you don't want the function to throw if no value is yielded,
 * use {@link First}.
 *
 * @returns
 * T
 *
 * @example
 * j.FirstOrThrow([1, 2, 3, 4])
 * // => 1
 *
 * @example
 * j.FirstOrThrow([])
 * // => Error
 */
export function FirstOrThrow<T> (iterable: Iterable<T>): T {
  for (const item of iterable) {
    return item
  }
  throw new Error(`No items yielded.`)
}

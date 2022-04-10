/**
 * @short
 * Get the *first* value.
 *
 * @categories
 * static
 *
 * @description
 * The first value yielded from the source iterator will be immediately returned, and the iterator
 * won't be queried any longer. If the iterator completes before yielding any value, `undefined`
 * is returned.
 *
 * If you want the operation to throw an error if no value is yielded, use {@link FirstOrThrow}.
 *
 * @returns
 * T | undefined
 *
 * @example
 * j.First([1, 2, 3, 4])
 * // => 1
 *
 * @example
 * j.First([])
 * // => undefined
 */
export function First<T> (iterable: Iterable<T>): T | undefined {
  for (const item of iterable) {
    return item
  }
}

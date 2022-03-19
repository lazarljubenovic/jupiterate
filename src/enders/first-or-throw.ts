import { Ender } from '../core/types'


/**
 * @short
 * Get the *first* value *or throw*.
 *
 * @categories
 * ender or-throw
 *
 * @description
 * The first value yielded from the source iterator will be immediately returned,
 * and the iterator won't be queried any longer. If the iterator completes before
 * yielding any value, `undefined` is returned.
 *
 * If you don't want the ender to throw if no value is yielded, use {@link first}.
 *
 * @returns
 * Ender<T, T>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.e.head(),
 * )
 * // => 1
 *
 * @example
 * j.pipe(
 *   [],
 *   j.e.head(),
 * )
 * // => Error
 */
export function firstOrThrow<T> (): Ender<T, T> {
  return function (iterable: Iterable<T>): T {
    for (const item of iterable) {
      return item
    }
    throw new Error(`No items yielded.`)
  }
}
import { Ender } from '../core/types'


/**
 * @short
 * Get the *first* value.
 *
 * @categories
 * ender
 *
 * @description
 * The first value yielded from the source iterator will be immediately returned,
 * and the iterator won't be queried any longer. If the iterator completes before
 * yielding any value, `undefined` is returned.
 *
 * If you want the ender to throw if no value is yielded, use {@link firstOrThrow}.
 *
 * @returns
 * Ender<T, T | undefined>
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
 * // => undefined
 */
export function first<T> (): Ender<T, T | undefined> {
  return function (iterable: Iterable<T>): T | undefined {
    for (const item of iterable) {
      return item
    }
  }
}
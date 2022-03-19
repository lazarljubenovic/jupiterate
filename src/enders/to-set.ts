import { Ender } from '../core/types'


/**
 * @short
 * Turn iterable *to array*.
 *
 * @categories
 * ender
 *
 * @description
 * Creates a set from the source iterable.
 *
 * @returns
 * Ender<T, Array<T>>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3],
 *   j.e.toArray(),
 * )
 * // => Set { 1, 2, 3 }
 */
export function toSet<T> (): Ender<T, Set<T>> {
  return function (iterable: Iterable<T>): Set<T> {
    return new Set(iterable)
  }
}

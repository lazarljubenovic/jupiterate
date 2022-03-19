import { Ender } from '../core/types'


/**
 * @short
 * Turn iterable *to array*.
 *
 * @categories
 * ender
 *
 * @description
 * Creates an array from the source iterable.
 *
 * @returns
 * Ender<T, Array<T>>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3],
 *   j.e.toArray(),
 * )
 * // => [1, 2, 3]
 */
export function toArray<T> (): Ender<T, Array<T>> {
  return function (iterable: Iterable<T>): Array<T> {
    return Array.from(iterable)
  }
}

/**
 * @short
 * Turn iterable *to readonly array*.
 *
 * @categories
 * ender
 *
 * @description
 * Creates an array typed as readonly from the source iterable.
 *
 * @returns
 * Ender<T, ReadonlyArray<T>>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3],
 *   j.e.toReadonlyArray(),
 * )
 * // => [1, 2, 3]
 */
export function toReadonlyArray<T> (): Ender<T, ReadonlyArray<T>> {
  return function (iterable: Iterable<T>): ReadonlyArray<T> {
    return Array.from(iterable)
  }
}

import { Operator } from '../core/types'


/**
 * @short
 * Transforms each value, *mapping* the iterable to a new one.
 *
 * @categories
 * operator
 *
 * @description
 * Yields all values in the same order as the input, but each value is transformed according to the given function.
 *
 * This is similar to `Array#map`.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * mapper
 * (t: T, i: number) => U
 *
 * @returns
 * Operator<T, U>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3],
 *   j.map(t => t * 10),
 * )
 * // => [10, 20, 30]
 *
 * @example
 * j.pipe(
 *   'jupiterate',
 *   j.map((c, i) => {
 *     return i % 2 == 0
 *       ? c.toUpperCase()
 *       : c.toLowerCase()
 *   },
 * )
 * // => 'JuPiTeRaTe'
 */
export function map<T, V> (mapper: (t: T, i: number) => V): Operator<T, V> {
  return function *(iterable: Iterable<T>): IterableIterator<V> {
    let index = 0
    for (const item of iterable) {
      yield mapper(item, index++)
    }
  }
}

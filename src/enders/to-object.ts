import { Ender } from '../core/types'


/**
 * @short
 * Create an *object* from key-value pairs.
 *
 * @categories
 * ender
 *
 * @description
 * Creates an object from the source iterable by using the first element
 * of a tuple for the key and the second element of the tuple for the value.
 *
 * @returns
 * Ender<[K, V], Record<K, V>>
 *
 * @example
 * j.pipe(
 *   [['a', 1], ['b', 2]],
 *   j.e.toObject(),
 * )
 * // => { a: 1, b: 2 }
 */
export function toObject<K extends string | number | symbol, V> (): Ender<readonly [K, V], Record<K, V>> {
  return function (iterable: Iterable<readonly [K, V]>): Record<K, V> {
    const object: Record<K, V> = {} as any
    for (const item of iterable) {
      object[item[0]] = item[1]
    }
    return object
  }
}
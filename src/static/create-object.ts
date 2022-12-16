/**
 * @short
 * *Create an object* from key-value pairs.
 *
 * @categories
 * static
 *
 * @description
 * Creates an object from the source iterable by using the first element
 * of a tuple for the key and the second element of the tuple for the value.
 *
 * @returns
 * Record<K, V>
 *
 * @example
 * j.CreateObject([['a', 1], ['b', 2]])
 * // => { a: 1, b: 2 }
 */
export function CreateObject<K extends string | number | symbol, V> (iterable: Iterable<readonly [K, V]>): Record<K, V> {
  const object: Record<K, V> = {} as any
  for (const item of iterable) {
    object[item[0]] = item[1]
  }
  return object
}

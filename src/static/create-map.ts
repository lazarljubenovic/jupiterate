/**
 * @short
 * *Create a map* from key-value pairs.
 *
 * @categories
 * static
 *
 * @description
 * Creates a map from the source iterable by using the first element
 * of a tuple for the key and the second element of the tuple for the value.
 *
 * @returns
 * Map<K, V>
 *
 * @example
 * j.CreateMap([['a', 1], ['b', 2]])
 * // => Map { 'a' => 1, 'b' => 2 }
 */
export function CreateMap<K, V> (iterable: Iterable<readonly [K, V]>): Map<K, V> {
  return new Map<K, V>(iterable)
}

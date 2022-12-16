/**
 * @short
 * *Create a set* from an iterable.
 *
 * @categories
 * static
 *
 * @description
 * Creates a set from the source iterable.
 *
 * @returns
 * Set<T>
 *
 * @example
 * j.CreateSet([1, 2, 3])
 * // => Set { 1, 2, 3 }
 */
export function CreateSet<T> (iterable: Iterable<T>): Set<T> {
  return new Set(iterable)
}

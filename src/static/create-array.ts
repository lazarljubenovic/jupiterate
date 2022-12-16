/**
 * @short
 * *Creates an array* from an iterable.
 *
 * @categories
 * static
 *
 * @description
 * Creates an array from the source iterable.
 *
 * @returns
 * Array<T>
 *
 * @example
 * j.CreateArray([1, 2, 3])
 * // => [1, 2, 3]
 */
export function CreateArray<T> (iterable: Iterable<T>): Array<T> {
  return Array.from(iterable)
}

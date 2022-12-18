/**
 * @short
 * *Concatenate* several iterables into one.
 *
 * @categories
 * static
 *
 * @description
 * Takes any number of iterables (including none), and returns a new iterable
 * which will yield all items from all iterables, in the order they were given.
 *
 * @parameter
 * ...iterables
 * Array<Iterable<T>>
 *
 * @example
 * j.Concat(
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9],
 * )
 * // => [1, 2, 3, 4, 5, 6, 7, 8, 9]
 *
 * @example
 * j.Concat(
 *   [1],
 *   [2, 3],
 *   [],
 *   [],
 *   [4],
 * )
 * // => [1, 2, 3, 4]
 *
 * @example
 * j.Concat()
 * // => []
 */
export function *Concat<T> (...iterables: Array<Iterable<T>>): IterableIterator<T> {
  for (const iterable of iterables) {
    yield *iterable
  }
}

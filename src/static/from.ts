/**
 * @short
 * Creates an iterable *from* another iterable.
 *
 * @categories
 * static generator
 *
 * @description
 * Given an iterable, returns the exact same iterable (re-yielding all the values).
 * Rarely useful on its own, but can be helpful as an identity iterable transformer.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * iterable
 * Iterable<T>
 *
 * @returns
 * Iterable<T>
 *
 * @example
 * j.From([1, 2, 3])
 * // => [1, 2, 3]
 */
export function *From<T> (iterable: Iterable<T>): Iterable<T> {
  yield *iterable
}

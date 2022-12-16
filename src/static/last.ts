/**
 * @short
 * Get *last* value.
 *
 * @categories
 * static trigger
 *
 * @description
 * Iterate through the iterable and return the last yielded value. If the
 * iterable is empty, `undefined` is returned.
 *
 * @returns
 * T | undefined
 *
 * @example
 * j.Last([1, 2, 3, 4])
 * // => 4
 *
 * @example
 * j.Last([])
 * // => undefined
 */
export function Last<T> (iterable: Iterable<T>): T | undefined {
  let current: T | undefined
  for (const item of iterable) {
    current = item
  }
  return current
}

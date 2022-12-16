/**
 * @short
 * Get the *size* of the iterable.
 *
 * @categories
 * static trigger
 *
 * @since
 * 0.0.1
 *
 * @description
 * Returns the number of yielded items from the given iterable.
 *
 * To take into account only items which satisfy a certain condition, use {@link Count} instead.
 *
 * @parameter
 * iterable
 * Iterable
 * The iterable whose size is being determined.
 *
 * @returns
 * number
 * The number of yielded items.
 *
 * @example
 * j.Size([1, 2, 3])
 * // => 3
 *
 * @example
 * j.Size([])
 * // => 0
 *
 * @example
 * j.Size(j.Integers())
 * // infinite loop
 */
export function Size (iterable: Iterable<unknown>): number {
  let count = 0
  for (const item of iterable) {
    count++
  }
  return count
}

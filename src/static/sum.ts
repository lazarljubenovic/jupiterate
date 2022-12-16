/**
 * @short
 * Get *sum* of all yielded values.
 *
 * @categories
 * static
 *
 * @description
 * Compute the sum of all values yielded from the source iterable.
 *
 * @returns
 * number
 *
 * @example
 * j.Sum([1, 2, 3])
 * // => 6
 *
 * @example
 * j.Sum([])
 * // => 0
 *
 * @example
 * j.Sum(j.Integers())
 * // infinite loop
 */
export function Sum (iterable: Iterable<number>): number {
  let sum = 0
  for (const item of iterable) {
    sum += item
  }
  return sum
}

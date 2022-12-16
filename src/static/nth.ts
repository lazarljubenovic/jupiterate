/**
 * @short
 * Get the *nth* yielded value.
 *
 * @categories
 * static
 *
 * @description
 * Iterate through the values and return the nth value. If there's no value
 * at that index, `undefined` will be returned.
 *
 * @parameter
 * n
 * number
 * The n.
 *
 * @returns
 * T | undefined
 *
 * @example
 * j.Nth('jupiter', 0)
 * // => 'j'
 *
 * @example
 * j.Nth('jupiter', 99)
 * // => undefined
 *
 * @example
 * j.pipe('jupiter', -1)
 * // => undefined
 */
export function Nth<T> (iterable: Iterable<T>, n: number): T | undefined {
  // TODO: fast path for negative, non-integer and infinite index? error? configurable?
  let index = 0
  for (const item of iterable) {
    if (n == index) return item
    index++
  }
  return undefined
}

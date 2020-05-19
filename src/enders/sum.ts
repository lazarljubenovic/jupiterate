import { Ender } from '../core/types'
import { identity } from '../utils'

/**
 * @short
 * Get *sum* of all yielded values.
 *
 * @categories
 * ender
 *
 * @description
 * Compute the sum of all values yielded from the source iterable.
 *
 * @returns
 * Ender<number, number>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.e.sum(),
 * )
 * // => 10
 *
 * @example
 * j.pipe(
 *   [],
 *   j.e.sum(),
 * )
 * // => 0
 *
 * @example
 * j.pipe(
 *   j.g.integers(),
 *   j.e.sum(),
 * )
 * // => Stack overflow error
 */
export function sum (): Ender<number, number> {
  return function (iterable: Iterable<number>): number {
    let sum = 0
    for (const item of iterable) {
      sum += item
    }
    return sum
  }
}

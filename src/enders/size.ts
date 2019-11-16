import { Ender } from '../core/types'
import { size as staticSize } from '../static/size'

/**
 * @short
 * Get the *size* of an iterable.
 *
 * @categories
 * ender
 *
 * @description
 * Simply counts the number of yielded values.
 *
 * @returns
 * Ender<T, number>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.e.size(),
 * )
 * // => 4
 *
 * @example
 * j.pipe(
 *   []
 *   j.e.size(),
 * )
 * // => 0
 *
 * @example
 * j.pipe(
 *   j.g.integers(),
 *   j.e.size(),
 * )
 * // => Stack overflow error
 */
export function size (): Ender<unknown, number> {
  return staticSize
}

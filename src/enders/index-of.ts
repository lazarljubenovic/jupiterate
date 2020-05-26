import { Ender } from '../core/types'
import { findIndex } from './find-index'
import { fpqqq } from '../utils'

/**
 * @short
 * Get *index of* a value.
 *
 * @categories
 * ender
 *
 * @description
 * Gets the index of the given item, using the strict equality for comparison.
 * Returns -1 if the given item is not found.
 *
 * This is a specialization of {@link findIndex}.
 *
 * @parameter
 * item
 * T
 * The item whose index is being looked for.
 *
 * @example
 * j.pipe(
 *   [10, 11, 12],
 *   j.e.indexOf(11),
 * )
 * // => 1
 *
 * @example
 * j.pipe(
 *   [10, 11, 12],
 *   j.e.indexOf(13),
 * )
 * // => -1
 */
export function indexOf<T> (item: T): Ender<T, number> {
  const eq = fpqqq(item)
  return findIndex(eq)
}

import { size } from './size'
import { intersection } from './intersection'


/**
 * @short
 * Check if iterables are *disjoint*.
 *
 * @categories
 * static trigger
 *
 * @description
 * Returns true if all given iterables are disjoint. Otherwise, returns false.
 *
 * Two sets are disjoint if their intersection is an empty set.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * ...iterables
 * Iterable[]
 * Iterables to operate on.
 *
 * @returns
 * boolean
 *
 * @example
 * j.s.areDisjoint(
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9],
 * )
 * // => true
 *
 * @example
 * j.s.areDisjoint(
 *   [1, 2, 3],
 *   [3, 4, 5],
 *   [5, 6, 7],
 * )
 * // => false
 */
export function areDisjoint (...iterables: Array<Iterable<unknown>>): boolean {
  return size(intersection(...iterables)) == 0
}

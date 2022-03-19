import { Operator } from '../core/types'
import { skipUntil } from './skip-until'


/**
 * @short
 * *Skips* first few elements, *while* a condition holds.
 *
 * @categories
 * operator predicate-based
 *
 * @description
 * The given predicate is applied to each value in a sequence. As long as the predicate returns true, the values are
 * discarded (skipped). Once the result of the given function is finally false, the value is passed through unchanged,
 * along with all further values (without being checked).
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * predicate
 * (t: T, i: number) => boolean
 * The function applied to each value until it returns false. The first argument is the value itself; the second one is
 * the index of the element.
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [-4, -2, 1, 3, 8, -5, 1],
 *   j.skipWhile(v => v < 0),
 * )
 * // => [1, 3, 8, -5, 1]
 *
 * @example
 * j.pipe(
 *   "  leading spaces,
 *   j.skipWhile(v => v == ' '),
 * )
 * // => "leading spaces"
 */
export function skipWhile<T> (predicate: (t: T, i: number) => boolean): Operator<T, T> {
  return skipUntil((t, i) => !predicate(t, i))
}

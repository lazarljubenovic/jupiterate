import { qqq } from '../utils'


/**
 * @short
 * Check if iterable *contains* the given value.
 *
 * @categories
 * static
 *
 * @description
 * Check each yielded value from the source iterable against the given needle,
 * until the needle is found. By default, the strict equality operator is used;
 * this can be customized with the second argument.
 *
 * @parameter
 * needle
 * T
 * The value whose presence we're checking.
 *
 * @parameter
 * comparison
 * (needle: T, yielded: T) => boolean
 * The function used to check equality. The first argument is always the needle
 * given through the first parameter. The second argument is the value yielded
 * from the source iterable that the check is being performed for.
 *
 * @returns
 * boolean
 *
 * @example
 * j.Contains([1, 2, 3, 4], 2)
 * // => true
 *
 * @example
 * j.Contains([1, 2, 3, 4], 6)
 * // => false
 *
 * @example
 * j.Contains(
 *   [
 *     { id: 1, name: 'foo' },
 *     { id: 2, name: 'bar' },
 *   ],
 *   { id: 1 },
 *   (a, b) => a.id == b.id,
 * )
 * // => true
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.andFinally(j.Contains, 2),
 * )
 * // => true
 */
export function Contains<T, N> (iterable: Iterable<T>, needle: N, comparison: (needle: N, yielded: T) => boolean): boolean
export function Contains<T> (iterable: Iterable<T>, needle: T, comparison?: (needle: T, yielded: T) => boolean): boolean
export function Contains<T, N = T> (iterable: Iterable<T>, needle: T, comparison: (needle: T, yielded: T) => boolean = qqq): boolean {
  for (const item of iterable) {
    if (comparison(needle, item)) return true
  }
  return false
}

import { Operator } from '../core/types'


/**
 * @short
 * Applies a *filter*.
 *
 * @categories
 * predicate-based type-guard
 *
 * @describe
 * Applies the given predicate function to every value. If the result of the predicate is `true`, the value is
 * propagated further, unchanged. Otherwise, the value is skipped over.
 *
 * This is the same behavior as `Array#filter`.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * predicate
 * (t: T, i: number) => boolean
 * The function applied to each element, used to determine what to do with the value. Respects type guards as well.
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4, 5],
 *   j.filter(x => x % 2 == 0),
 * )
 * // => [2, 4]
 *
 * @example
 * j.pipe(
 *   'abCdEFG',
 *   j.filter(c => c.toLowerCase() == c),
 * )
 * // => 'abd'
 */
export function filter<T, R extends T> (guard: (t: T, i: number) => t is R): Operator<T, R>
export function filter<T> (predicate: (t: T, i: number) => boolean): Operator<T, T>
export function filter<T> (predicate: (t: T, i: number) => boolean): Operator<T, T> {
  return function *(iterable: Iterable<T>): IterableIterator<T> {
    let i = 0
    for (const item of iterable) {
      if (predicate(item, i++)) {
        yield item
      }
    }
  }
}

import { Operator } from '../core/types'


/**
 * @short
 * Applies a *filter* and gets *indexes* of matching values.
 *
 * @categories
 * operator predicate-based
 *
 * @description
 * Applies the given predicate function to every value. If the result of the predicate is `true`, the index of the
 * value is propagated further, unchanged. Otherwise, the value is skipped over.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * predicate
 * (t: T, i: number) => boolean
 * The function applied to each element, used to determine what to do with the value.
 *
 * @returns
 * Operator<T, number>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4, 5],
 *   j.filterIndex(x => x % 2 == 0),
 * )
 * // => [1, 3]
 *
 * @example
 * j.pipe(
 *   'abCdEFG',
 *   j.filterIndex(c => c.toLowerCase() == c),
 * )
 * // => [0, 1, 3]
 */
export function filterIndex<T> (predicate: (t: T, i: number) => boolean): Operator<T, number> {
  return function *(iterable: Iterable<T>): IterableIterator<number> {
    let i = 0
    for (const item of iterable) {
      if (predicate(item, i)) {
        yield i
      }
      i++
    }
  }
}

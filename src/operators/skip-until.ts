import { Operator } from '../core/types'


/**
 * @short
 * *Skips* first few elements, *until* a matching one is found.
 *
 * @categories
 * operator predicate-based
 *
 * @description
 * The given predicate is applied to each value yielded from the source iterable. As long as the predicate returns
 * false, the values are discarded (skipped). Once the result of the given function is finally true, the value is
 * passed through unchanged, along with all further values (without being checked).
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * predicate
 * (t: T, i: number) => boolean
 * The function applied to each value until it returns true. The first argument is the value itself; the second one is
 * the index of the element.
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [-4, -2, 1, 3, 8, -5, 1],
 *   j.skipUntil(v => v > 0),
 * )
 * // => [1, 3, 8, -5, 1]
 *
 * @example
 * j.pipe(
 *   "    leading spaces",
 *   j.skipUntil(v => v != ' '),
 * )
 * // => "leading spaces"
 */
export function skipUntil<T> (predicate: (t: T, i: number) => boolean): Operator<T, T> {
  return function *(iterable: Iterable<T>): IterableIterator<T> {
    let index = 0
    let isFound = false
    for (const item of iterable) {
      if (isFound) {
        yield item
      } else {
        if (predicate(item, index++)) {
          isFound = true
          yield item
        }
      }
    }
  }
}

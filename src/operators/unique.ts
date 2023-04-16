import { Operator, Unary } from '../core/types'
import { identity } from '../utils'


/**
 * @short
 * Yield only values which are *unique by* some feature.
 *
 * @categories
 * operator
 *
 * @description
 * Applies the given `project` function to each value yielded from the source
 * observable. If the same value has already appeared among the previously
 * yielded values, it will be discarded; otherwise, it's simply propagated
 * through.
 *
 * The equality between projected values is determined using the `SameValueZero`
 * algorithm.
 *
 * This is a generalization of {@link unique}.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * project
 * (t: T) => unknown
 * The function which determines what's the unique feature being tracked.
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [2, 0, 2, 3],
 *   j.uniqueBy(t => t % 2),
 * )
 * // => [2, 3]
 */
export function uniqueBy<T> (
  project: Unary<T, unknown>,
): Operator<T, T> {
  return function *(iterable: Iterable<T>): IterableIterator<T> {
    const prevItems = new Set<unknown>()
    for (const item of iterable) {
      const key = project(item)
      if (prevItems.has(key)) {
        continue
      }
      prevItems.add(key)
      yield item
    }
  }
}

/**
 * @short
 * Yield only values which are *unique*.
 *
 * @categories
 * operator
 *
 * @description
 * Remembers each yielded value. For each yielded value, if has already appeared
 * among the previous ones, it will be discarded; otherwise, it's simply propagated
 * through.
 *
 * The equality between projected values is determined using the `SameValueZero`
 * algorithm.
 *
 * This is a specialization of {@link uniqueBy}.
 *
 * @since
 * 0.0.1
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [2, 0, 2, 3],
 *   j.unique(),
 * )
 * // => [2, 0, 3]
 */
export function unique<T> (): Operator<T, T> {
  return uniqueBy(identity)
}

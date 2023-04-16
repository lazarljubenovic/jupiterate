import { Operator } from '../core/types'


/**
 * @short
 * *Take* yielded values *until* a condition is met.
 *
 * @categories
 * operator predicate-based
 *
 * @description
 * The values yielded from the source iterable are propagated through this
 * operator as long as they **don't** satisfy the given predicate.
 *
 * Compare with {@link filter}, {@link takeWhile}, {@link skipWhile} and
 * {@link skipUntil}.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * predicate
 * (t: T, i: number) => boolean
 * The function applied to each yielded value, used to determine if
 * the propagation should be stopped, or if the value should be propagated
 * through.
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.takeUntil(x => x >= 3),
 * )
 * // => [1, 2]
 */
export function takeUntil<T> (predicate: (t: T, i: number) => boolean): Operator<T, T> {
  return function *(iterable: Iterable<T>): IterableIterator<T> {
    let index = 0
    for (const item of iterable) {
      if (!predicate(item, index++)) {
        yield item
      } else {
        return
      }
    }
  }
}

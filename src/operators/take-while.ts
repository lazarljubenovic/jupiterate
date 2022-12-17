import { Operator } from '../core/types'

/**
 * @short
 * *Take* elements *while* they satisfy a condition.
 *
 * @categories
 * operator
 *
 * @description
 * The elements yielded from the source iterable are propagated through this
 * operator as long as they satisfy the given predicate.
 *
 * The predicate signature is guard-friendly.
 *
 * Compare with {@link filter}, {@link takeUntil}, {@link skipWhile} and
 * {@link skipUntil}.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * predicate
 * (t: T, i: number) => boolean
 * The function applied to each element, used to determine if the value should
 * be propagated through, or if propagation should be stopped.
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.takeWhile(x => x < 3),
 * )
 * // => [1, 2]
 */
export function takeWhile<T, R extends T> (guard: (t: T, i: number) => t is R): Operator<T, R>
export function takeWhile<T> (predicate: (t: T, i: number) => boolean): Operator<T, T>
export function takeWhile<T> (predicate: (t: T, i: number) => boolean): Operator<T, T> {
  return function *(iterable: Iterable<T>): IterableIterator<T> {
    let index = 0
    for (const item of iterable) {
      if (predicate(item, index++)) {
        yield item
      } else {
        return
      }
    }
  }
}

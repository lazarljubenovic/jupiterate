import { Operator } from '../core/types'


/**
 * @short
 * *Take first* several yielded values.
 *
 * @categories
 * operator
 *
 * @description
 * Only the first `count` values yielded from the source iterable are
 * propagated through this operator.
 *
 * This is a specialization of {@link takeWhile} and {@link takeUntil}.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * count
 * The number of values to propagate through.
 *
 * @returns
 * Operator<T, T>
 *
 * @throws
 * `RangeError` when the given `count` is not an integer or less than zero.
 *
 * @example
 * j.pipe(
 *   'jupiterate',
 *   j.takeFirst(7),
 * )
 * // => 'jupiter'
 */
export function takeFirst<T> (count: number): Operator<T, T> {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError(`Count must be an integer not less than 0; an attempt was made to define count as ${count}.`)
  }
  return function *(iterable: Iterable<T>): IterableIterator<T> {
    for (const item of iterable) {
      if (count-- > 0) {
        yield item
      } else {
        return
      }
    }
  }
}

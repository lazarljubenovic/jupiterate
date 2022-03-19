import { Operator } from '../core/types'


/**
 * @short
 * *Slice* a chunk of an iterable.
 *
 * @categories
 * operator
 *
 * @description
 * Yields only values whose indices are between `start` (inclusive; default 0)
 * and `end` (exclusive; default infinity) of an iterable that this operator
 * is applied to.
 *
 * If `start` or `end` are out of range, they will be capped to `0` and the
 * length of an observable. Therefore, to take all values until the end, use
 * `Infinity` for `end`.
 *
 * If `start` is greater than `end`, the function will throw and the operator.
 * won't be created.
 *
 * The size of the resulting iterable will be `end - start`.
 *
 * This is similar to `Array#slice`.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * start [default 0]
 * number
 * The index of the first value yielded in the resulting iterable.
 *
 * @parameter
 * end [default Infinity]
 * number
 * The index of the first value not yielded in the resulting iterable.
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [0, 1, 2, 3, 4, 5],
 *   j.slice(1, 4),
 * )
 * // => [1, 2, 3]
 *
 * @example
 * j.pipe(
 *   [0, 1, 2, 3, 4, 5],
 *   j.slice(2, 2),
 * )
 * // => []
 *
 * @example j.pipe(
 *   [0, 1, 2, 3, 4, 5],
 *   j.slice(
 * )
 */
export function slice<T> (start: number = 0, end: number = Infinity): Operator<T, T> {
  if (end < start) throw new Error(`start (${start}) cannot be larger than end (${end})`)
  return function *(iterable: Iterable<T>): Iterable<T> {
    let index = -1
    for (const item of iterable) {
      index++
      if (index < start) continue
      if (index < end) {
        yield item
        continue
      }
      return
    }
  }
}

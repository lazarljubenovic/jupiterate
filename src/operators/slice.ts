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
 * and `end` (exclusive; default infinity) of the source iterable.
 *
 * If `start` or `end` are out of range, they will be capped to `0` and the
 * length of an iterable, respectively. Therefore, to take all values until
 * the end, use `Infinity` for `end` (or leave it out).
 *
 * If `start` is greater than `end`, the function will throw and the operator
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
 * @throws
 * `RangeError` when the given start and end are not compatible.
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
 */
export function slice<T> (start: number = 0, end: number = Infinity): Operator<T, T> {
  if (end < start) throw new RangeError(`The given start (${start}) cannot be larger than end (${end}).`)
  return function *(iterable: Iterable<T>): IterableIterator<T> {
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

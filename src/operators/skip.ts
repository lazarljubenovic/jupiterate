/**
 * @short
 * *Skip* first few elements.
 *
 * @categories
 * operator
 *
 * @description
 * Given a number, that many values are skipped over in the iterable this
 * operator is applied to. After that, the iterable yields the rest of the
 * values normally.
 *
 * If the given number is greater than the size of the iterable, the resulting
 * iterable will be empty.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * count
 * number
 * Determines how many elements to skip.
 *
 * @returns
 * Operator<T>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.skip(2),
 * )
 * // => [3, 4]
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.skip(10),
 * )
 * // => []
 */
export function skip (count: number) {
  return function *<T> (iterable: Iterable<T>): IterableIterator<T> {
    let index = 0
    for (const item of iterable) {
      if (index >= count) {
        yield item
      }
      index++
    }
  }
}

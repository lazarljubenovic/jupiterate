/**
 * @short
 * Yields *integers*.
 *
 * @categories
 * static generator
 *
 * @description
 * Yields integers from the given interval. When no end is given, the resulting iterable is
 * infinite. The default starting value is 0.
 *
 * @since 0.0.1
 *
 * @parameter
 * start [default 0]
 * number
 * The first number in the sequence.
 *
 * @parameter
 * end [default Infinity]
 * number
 * The number after the last one in the sequence.
 *
 * @returns
 * IterableIterator<number>
 *
 * @example
 * j.Integers()
 * // => [0, 1, 2, 3...
 *
 * @example
 * j.Integers(3)
 * // => [3, 4, 5, 6...
 *
 * @example
 * j.Integers(5, 8)
 * // => [5, 6, 7]
 */
export function *Integers (start: number = 0, end: number = Infinity): IterableIterator<number> {
  let n = start
  while (n < end) {
    yield n++
  }
}

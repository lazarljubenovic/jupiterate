import { Operator } from '../core/types'


/**
 * @short
 * *Tap* into the iteration for side effects.
 *
 * @categories
 * operator
 *
 * @description
 * Performs the given function for each value yielded from the source iterator.
 * The resulting iterator is a replica of the source one.
 *
 * Note that, just like with all other operators, it won't be executed until
 * something starts asking for the iterable to yield new values.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * fn
 * (t: T, index: number) => void
 * The function called for each yielded value.
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3],
 *   j.tap(t => console.log(t)),
 * )
 * // => [1, 2, 3]
 */
export function tap<T> (fn: (t: T, index: number) => void): Operator<T, T> {
  return function *(iterable: Iterable<T>): IterableIterator<T> {
    let index = 0
    for (const item of iterable) {
      fn(item, index)
      yield item
      index++
    }
  }
}

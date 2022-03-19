import { Ender } from '../core/types'
import { filter } from '../operators'
import { not } from '../utils'


/**
 * @short
 * Create two *partitions* based on a condition.
 *
 * @categories
 * ender
 *
 * @description
 * This ender returns an array of two elements. Both of the elements are
 * iterables. The first iterable will yield values from the source iterable
 * which satisfy the given condition. The second iterable will yield values
 * from the source iterable which do not satisfy the given condition.
 *
 * The signature of the ender is guard-friendly.
 *
 * @parameter
 * condition
 * (t: T) => boolean
 *
 * @returns
 * Ender<T, [Iterable<T>, Iterable<T>]>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4, 5, 6],
 *   j.e.partition(x => x % 2 == 0),
 * )
 * // => [ [2, 4, 6], [1, 3, 5] ]
 *
 * @example
 * j.pipe(
 *   [1, 2, 3],
 *   j.e.partition(x => x < 0),
 * )
 * // => [ [], [1, 2, 3] ]
 */
export function partition<T, U extends T> (guard: (t: T) => t is U): Ender<T, [Iterable<U>, Iterable<Exclude<T, U>>]>
export function partition<T> (condition: (t: T) => boolean): Ender<T, [Iterable<T>, Iterable<T>]>
export function partition<T> (condition: (t: T) => boolean): Ender<T, [Iterable<T>, Iterable<T>]> {
  return function (iterable: Iterable<T>): [Iterable<T>, Iterable<T>] {
    return [
      filter(condition)(iterable),
      filter(not(condition))(iterable),
    ]
  }
}

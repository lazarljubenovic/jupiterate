import { filter } from '../operators'
import { not } from '../utils'


/**
 * @short
 * Create two *partitions* based on a condition.
 *
 * @categories
 * static
 *
 * @description
 * This function returns an array of two elements. Both of the elements are
 * iterables. The first iterable will yield values from the source iterable
 * which satisfy the given condition. The second iterable will yield values
 * from the source iterable which do not satisfy the given condition.
 *
 * The signature is guard-friendly.
 *
 * @parameter
 * condition
 * (t: T) => boolean
 *
 * @returns
 * [Iterable<T>, Iterable<T>]
 *
 * @example
 * j.Partition(
 *   [1, 2, 3, 4, 5, 6],
 *   x => x % 2 == 0,
 * )
 * // => [ [2, 4, 6], [1, 3, 5] ]
 *
 * @example
 * j.Partition(
 *   [1, 2, 3],
 *   x => x < 0,
 * )
 * // => [ [], [1, 2, 3] ]
 */
export function Partition<T, U extends T> (iterable: Iterable<T>, guard: (t: T) => t is U): [IterableIterator<U>, IterableIterator<Exclude<T, U>>]
export function Partition<T> (iterable: Iterable<T>, condition: (t: T) => boolean): [IterableIterator<T>, IterableIterator<T>]
export function Partition<T> (iterable: Iterable<T>, condition: (t: T) => boolean): [IterableIterator<T>, IterableIterator<T>] {
  return [
    filter(condition)(iterable),
    filter(not(condition))(iterable),
  ]
}

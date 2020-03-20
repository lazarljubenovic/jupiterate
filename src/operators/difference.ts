import { Operator } from '../core/types'
import { compareBy, identity, qqq } from '../utils'

/**
 * @short
 * Computes the *difference* with another iterable, *using* the provided equality operator.
 *
 * @categories
 * operator accepts-iterable equality-function trigger
 *
 * @description
 * Yields values not included in the given iterable, using a custom function for the equality check between items. The
 * order of values is determined by the iterable on which the returned operator is used, ie. the “first argument” (not
 * the argument of this function).
 *
 * This is a generalization of {@link differenceBy} and {@link difference}.
 *
 * @since
 * 0.0.1
 *
 * @argument
 * otherIterable
 * Iterable<U>
 * The “second argument” of the difference operator.
 *
 * @argument
 * areEqual
 * (t: T, u: U) => boolean
 * The function used to compare yielded values from both iterables to determine their equality.
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4, 5],
 *   j.differenceUsing([4, 2, 6], (t, u) => t == u),
 * )
 * // => [1, 3, 5]
 *
 * @example
 * j.pipe(
 *   [300, 301, 302, 303, 304, 305, 306, 307],
 *   j.differenceUsing([1, 2], (t, u) => t % 3 == u),
 * )
 * // => [300, 303, 306]
 */
export function differenceUsing<T, U = T> (
  otherIterable: Iterable<U>,
  areEqual: (t: T, u: U) => boolean,
): Operator<T, T> {
  const otherItems: Set<U> = new Set(otherIterable)
  return function* (iterable: Iterable<T>): Iterable<T> {
    outer: for (const item of iterable) {
      for (const otherItem of otherItems) {
        if (areEqual(item, otherItem)) {
          continue outer
        }
      }
      yield item
    }
  }
}

/**
 * @short
 * Computes the *difference* with another iterable, guided *by* the provided function to know what to compare.
 *
 * @categories
 * operator trigger
 *
 * @description
 * Yields values not included in the given iterable, using a custom function to transform the items before comparing
 * them using strict equality. The order of values is determined by the iterable on which the returned operator is used,
 * ie. the “first argument” (not the argument of this function).
 *
 * This is a specialization of {@link differenceUsing} and generalization of {@link difference}.
 *
 * @since
 * 0.0.1
 *
 * @argument
 * otherIterable
 * Iterable<U>
 * The “second argument” of the difference operator.
 *
 * @argument
 * map
 * (t: T) => any
 * The function used to transform each item before comparing them using strict equality.
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4, 5],
 *   j.differenceBy([4, 2, 6], t => t),
 * )
 * // => [1, 3, 5]
 *
 * @example
 * j.pipe(
 *   [300, 301, 302, 303, 304, 305, 306, 307],
 *   j.differenceBy([1, 2], t => t % 3),
 * )
 * // => [300, 303, 306]
 */
export function differenceBy<T> (otherIterable: Iterable<T>, map: (t: T) => any): Operator<T, T> {
  return differenceUsing(otherIterable, compareBy(map, qqq))
}

/**
 * @short
 * Computes the *difference* with another iterable.
 *
 * @categories
 * operator trigger
 *
 * @description
 * Yields values not included in the given iterable, using strict equality. The order of values is determined by the
 * iterable on which the returned operator is used, ie. the “first argument” (not the argument of this function).
 *
 * This is a specialization of {@link differenceUsing} and of {@link difference}.
 *
 * @since
 * 0.0.1
 *
 * @argument
 * otherIterable
 * Iterable<U>
 * The “second argument” of the difference operator.
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4, 5],
 *   j.difference([4, 2, 6]),
 * )
 * // => [1, 3, 5]
 */
export function difference<T> (otherIterable: Iterable<T>): Operator<T, T> {
  return differenceBy(otherIterable, identity)
}

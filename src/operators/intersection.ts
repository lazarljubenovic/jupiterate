import { Operator } from '../core/types'
import { compareBy, identity, qqq } from '../utils'


/**
 * @short
 * Compute *intersection* with another iterable, *using* the provided equality operator.
 *
 * @categories
 * operator accepts-iterable quality-function trigger
 *
 * @description
 * Yields values included in the given iterable, using a custom function for the equality check.
 * The order of values is determined by the iterable on which the returned operator is used,
 * ie. the “first argument” (not the argument of this function).
 *
 * This is a generalization of {@link intersectionBy} and {@link intersection}.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * otherIterable
 * Iterable<T>
 * The “second argument” of the difference operator.
 *
 * @parameter
 * areEqual
 * (a: T, b: T) => boolean
 * The function used to compare yielded values from both observables to determine their equality
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.intersectionUsing([1, 3, 5, 7], (a, b) => a == b),
 * )
 * // => [1, 3]
 *
 * @example
 * j.pipe(
 *   'jupiterate',
 *   j.intersectionUsing('aeiou', (a, b) => a == b),
 * )
 * // => 'uieae'
 */
export function intersectionUsing<T> (
  otherIterable: Iterable<T>,
  eq: (a: T, b: T) => boolean,
): Operator<T, T> {
  const otherItems: Set<T> = new Set(otherIterable)
  return function *(iterable: Iterable<T>): Iterable<T> {
    outer: for (const item of iterable) {
      for (const otherItem of otherItems) {
        if (eq(otherItem, item)) {
          yield item
          continue outer
        }
      }
    }
  }
}

/**
 * @short
 * Computes the *difference* with another iterable, guided *by* the provided function to know
 * what to compare.
 *
 * @categories
 * operator accepts-iterable trigger
 *
 * @description
 * Yields values included in the given iterable, using a custom function to transform items
 * before comparing them using strict equality. The order of values is determined by the
 * iterable on which the returned operator is used, ie. the “first argument” (not the
 * argument of this function).
 *
 * This is a specialization of {@link intersectionUsing} and generalization of
 * {@link intersection}.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * otherIterable
 * Iterable<T>
 * The “second argument” of the difference operator.
 *
 * @parameter
 * map
 * (t: T) => any
 * The function used to transform each item before comparing them using strict equality.
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.intersectionBy([1, 3, 5, 7], t => t),
 * )
 * // => [1, 3]
 *
 * @example
 * j.pipe(
 *   'jupiterate',
 *   j.intersectionBy('aeiou', t => t),
 * )
 * // => 'uieae'
 */
export function intersectionBy<T> (
  otherIterable: Iterable<T>,
  map: (t: T) => any,
): Operator<T, T> {
  return intersectionUsing(otherIterable, compareBy(map, qqq))
}

/**
 * @short
 * Computes the *difference* with another iterable.
 *
 * @categories
 * operator accepts-iterable trigger
 *
 * @description
 * Yields values included in the given iterable,using strict equality. The order of values
 * is determined by the iterable on which the returned operator is used, ie. the “first
 * argument” (not the argument of this function).
 *
 * This is a specialization of {@link intersectionUsing} and {@link intersectionBy}.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * otherIterable
 * Iterable<T>
 * The “second argument” of the difference operator.
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.intersectionBy([1, 3, 5, 7]),
 * )
 * // => [1, 3]
 *
 * @example
 * j.pipe(
 *   'jupiterate',
 *   j.intersectionBy('aeiou'),
 * )
 * // => 'uieae'
 */

export function intersection<T> (otherIterable: Iterable<T>): Operator<T, T> {
  return intersectionBy(otherIterable, identity)
}

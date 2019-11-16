import { Operator } from '../core/types'
import { compareBy, identity, qqq } from '../utils'

/**
 * Yields values not included in the given iterable, using a custom function
 * for the equality check.
 *
 * The order of values is determined by the iterable on which the
 * returned operator is used.
 *
 * Note that the given iterable will be iterated over.
 *
 * This is a generalization of the {@link differenceBy} and {@link difference}
 * operators.
 *
 * @param otherIterable - The given iterable that the result will be disjoint
 * with.
 * @param eq - The function which accepts two items and determines if they
 * are equal or not.
 */
export function differenceWith<T> (otherIterable: Iterable<T>, eq: (a: T, b: T) => boolean): Operator<T, T> {
  const otherItems: Set<T> = new Set(otherIterable)
  return function* (iterable: Iterable<T>): Iterable<T> {
    outer: for (const item of iterable) {
      for (const otherItem of otherItems) {
        if (eq(otherItem, item)) {
          continue outer
        }
      }
      yield item
    }
  }
}

/**
 * Yields values not included in the given iterable, using a function which
 * specifies what to use for the equality check.
 *
 * The equality check between the returned values is done via `===`.
 *
 * The order of values is determined by the iterable on which the
 * returned operator is used.
 *
 * Note that the given iterable will be iterated over.
 *
 * This is a special case for the {@link differenceWith} operator, and a
 * generalization of {@link difference} operator.
 *
 * @param otherIterable - The given iterable that the result will be disjoint
 * with.
 * @param map - The function which takes an item from an observable
 * and returns the value which will be used to check for item equality, using
 * the `===` operator.
 */
export function differenceBy<T> (otherIterable: Iterable<T>, map: (t: T) => any): Operator<T, T> {
  return differenceWith(otherIterable, compareBy(map, qqq))
}

/**
 * Yields values not included in the given iterable
 *
 * It uses `===` for the equality check directly on the items.
 *
 * The order of values is determined by the iterable on which the
 * returned operator is used.
 *
 * Note that the given iterable will be iterated over.
 *
 * This is a special case for the {@link differenceBy} and
 * {@link differenceWith} operators.
 *
 * @param otherIterable - The given iterable that the result will be disjoint
 * with.
 */
export function difference<T> (otherIterable: Iterable<T>): Operator<T, T> {
  return differenceBy(otherIterable, identity)
}

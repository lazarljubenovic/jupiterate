import { Operator } from '../core/types'
import { compareBy, identity, qqq } from '../utils'

/**
 * Yields values included in the given iterable, using a custom function
 * for the equality check.
 *
 * @param otherIterable - The given iterable that the result will be an
 * intersection with.
 * @param eq - The function which accepts two items and determines if they
 * are equal or not.
 */
export function intersectionWith<T> (otherIterable: Iterable<T>, eq: (a: T, b: T) => boolean): Operator<T, T> {
  const otherItems: Set<T> = new Set(otherIterable)
  return function* (iterable: Iterable<T>): Iterable<T> {
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

export function intersectionBy<T> (otherIterable: Iterable<T>, map: (t: T) => any): Operator<T, T> {
  return intersectionWith(otherIterable, compareBy(map, qqq))
}

export function intersection<T> (otherIterable: Iterable<T>): Operator<T, T> {
  return intersectionBy(otherIterable, identity)
}

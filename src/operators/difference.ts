import { Operator } from '../core/types'


/**
 * @short
 * Computes the *difference* with another iterable, *using* the provided equality operator.
 *
 * @categories
 * operator accepts-iterable equality-function trigger
 *
 * @description
 * Yields only those values from the source iterable which are not included in the given iterable, using a custom
 * function for the equality check between items. The order of values is determined by the source
 * iterable.
 *
 * This is a generalization of {@link differenceBy}, and therefore of {@link difference} as well.
 *
 * Note that this operator will run through the entire given iterable for each yielded value in the source iterable.
 * Consider using {@link differenceBy} if performance is of concern.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * otherIterable
 * Iterable<U>
 * The “second argument” of the difference operator.
 *
 * @parameter
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
 *   j.differenceUsing([2, 4], (t, u) => t % 5 == u),
 * )
 * // => [301, 303, 305, 306]
 */
export function differenceUsing<T, U = T> (
  otherIterable: Iterable<U>,
  areEqual: (t: T, u: U) => boolean,
): Operator<T, T> {
  const otherItems: Set<U> = new Set(otherIterable)
  return function *(iterable: Iterable<T>): IterableIterator<T> {
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
 * operator accepts-iterable trigger
 *
 * @description
 * Yields values not included in the given iterable, using a custom function to transform the items before comparing
 * them using [the SameValueZero algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality).
 * The order of values is determined by the source iterable.
 *
 * This is a specialization of {@link differenceUsing} and a generalization of {@link difference}.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * otherIterable
 * Iterable<U>
 * The “second argument” of the difference operator.
 *
 * @parameter
 * project
 * (t: T) => unknown
 * The function used to transform each item before comparing them.
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
 *   j.differenceBy([2, 4], t => t % 5),
 * )
 * // => [300, 303, 305, 306]
 */
export function differenceBy<T> (otherIterable: Iterable<T>, project: (t: T) => unknown): Operator<T, T> {
  const otherItems = new Map<unknown, T>()
  for (const otherItem of otherIterable) {
    otherItems.set(project(otherItem), otherItem)
  }
  return function *(iterable: Iterable<T>): IterableIterator<T> {
    for (const item of iterable) {
      if (otherItems.has(project(item))) {
        continue
      }
      yield item
    }
  }
}

/**
 * @short
 * Computes the *difference* with another iterable.
 *
 * @categories
 * operator trigger
 *
 * @description
 * Yields values not included in the given iterable, using [the SameValueZero algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality).
 * The order of values is determined by the source iterable.
 *
 * This is a specialization of {@link differenceUsing}, and therefore of {@link differenceBy} as well.
 *
 * @since
 * 0.0.1
 *
 * @parameter
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
  const otherItems = new Set<T>(otherIterable)
  return function *(iterable: Iterable<T>): IterableIterator<T> {
    for (const item of iterable) {
      if (otherItems.has(item)) {
        continue
      }
      yield item
    }
  }
}

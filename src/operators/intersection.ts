import { Operator } from '../core/types'


/**
 * @short
 * Compute *intersection* with another iterable, *using* the provided equality operator.
 *
 * @categories
 * operator accepts-iterable equality-function trigger
 *
 * @description
 * Yields values included in the given iterable, using a custom function for the equality check between items. The
 * order of values is determined by the source iterable.
 *
 * This is a generalization of {@link intersectionBy}, and therefore of {@link intersection} as well.
 *
 * Note that this operator will run through the entire given iterable for each yielded value in the source iterable.
 * Consider using {@link intersectionBy} if performance is of concern.
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
 * The function used to compare yielded values from both iterables to determine their equality.
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 *   j.intersectionUsing([1, 3, 5, 7], (t, u) => t == u),
 * )
 * // => [1, 3]
 *
 * @example
 * j.pipe(
 *   'jupiterate',
 *   j.intersectionUsing('aeiou', (t, u) => t == u),
 * )
 * // => 'uieae'
 *
 * @example
 * j.pipe(
 *   ['foo', 'bar', 'baz', 'qux', 'quux'],
 *   j.intersectionUsing(['a', 'b', 'c'], (x, y) => y.startsWith(x)),
 * )
 * // => ['bar', 'baz']
 *
 * @example
 * j.pipe(
 *   ['a', 'aa', 'aaa', 'aaaa', 'b', 'bb', 'bbb', 'bbbb', 'c', 'cc', 'ccc', 'cccc'],
 *   j.intersectionUsing([1, 6, 11], (t, u) => t.length == u % 5),
 * )
 * // => ['a', 'b', 'c']
 */
export function intersectionUsing<T, U = T> (
  otherIterable: Iterable<U>,
  areEqual: (t: T, u: U) => boolean,
): Operator<T, T> {
  const otherItems: Set<U> = new Set(otherIterable)
  return function *(iterable: Iterable<T>): IterableIterator<T> {
    outer: for (const item of iterable) {
      for (const otherItem of otherItems) {
        if (areEqual(item, otherItem)) {
          yield item
          continue outer
        }
      }
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
 * Yields values included in the given iterable, using a custom function to transform items before comparing
 * them using [the SameValueZero algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality).
 * The order of values is determined by the source iterable.
 *
 * This is a specialization of {@link intersectionUsing} and a generalization of {@link intersection}.
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
 * project
 * (t: T) => unknown
 * The function used to transform each item before comparing them.
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
  project: (t: T) => unknown,
): Operator<T, T> {
  const otherItems = new Map<unknown, T>()
  for (const otherItem of otherIterable) {
    otherItems.set(project(otherItem), otherItem)
  }
  return function *(iterable: Iterable<T>): IterableIterator<T> {
    for (const item of iterable) {
      if (otherItems.has(project(item))) {
        yield item
      }
    }
  }
}

/**
 * @short
 * Computes the *difference* with another iterable.
 *
 * @categories
 * operator accepts-iterable trigger
 *
 * @description
 * Yields values included in the given iterable, using [the SameValueZero algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality).
 * The order of values is determined by the iterable on which the returned operator is used, i.e. the “first argument”
 * (not the argument of this function).
 *
 * This is a specialization of {@link intersectionUsing}, and therefore of {@link intersectionBy} as well.
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
 *   j.intersection([1, 3, 5, 7]),
 * )
 * // => [1, 3]
 *
 * @example
 * j.pipe(
 *   'jupiterate',
 *   j.intersection('aeiou'),
 * )
 * // => 'uieae'
 */

export function intersection<T> (otherIterable: Iterable<T>): Operator<T, T> {
  const otherItems = new Set<T>(otherIterable)
  return function *(iterable: Iterable<T>): IterableIterator<T> {
    for (const item of iterable) {
      if (otherItems.has(item)) {
        yield item
      }
    }
  }
}

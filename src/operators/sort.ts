import { Operator, Unary } from '../core/types'
import { identity } from '../utils'


/**
 * @short
 * *Sort* values *using* the provided comparison operator.
 *
 * @categories
 * operator trigger
 *
 * @description
 * Returns a new iterable which emits all the same values as the source iterable,
 * but in different order. The order is determined by invoking the `compareFn`.
 *
 * This is a generalization of {@link sortBy}, and therefore of {@link sort} as well.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * compareFn
 * (a: T, b: T) => number
 * Passed directly to [`Array#sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#parameters).
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [5, 2, 6, 3, 1, 6],
 *   j.sort((a, b) => a - b),
 * )
 * // => [1, 2, 3, 5, 6, 6]
 *
 * @example
 * j.pipe(
 *   [
 *     { name: 'foo-1', age: 19 },
 *     { name: 'bar', age: 21 },
 *     { name: 'foo-2', age: 19 },
 *     { name: 'baz', age: 18 },
 *   ],
 *   j.sortUsing((a, b) => b.age - a.age),
 * )
 * // => [
 * //   { name: 'bar', age: 21 },
 * //   { name: 'foo-1', age: 19 },
 * //   { name: 'foo-2', age: 19 },
 * //   { name: 'baz', age: 18 },
 * // ]
 */
export function sortUsing<T> (compareFn: (a: T, b: T) => number): Operator<T, T> {
  return function *(iterable: Iterable<T>): IterableIterator<T> {
    const array = Array.from(iterable)
    array.sort(compareFn)
    yield *array
  }
}


/**
 * @short
 * *Sort* values in ascending or descending order *by* the provided projection.
 *
 * @categories
 * operator trigger
 *
 * @description
 * Returns a new iterable which emits all the same values as the source iterable,
 * but in different order. The order is determined by the values' projections.
 *
 * This is a generalization of {@link sort}, and a specialization of {@link sortUsing}.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * project
 * (t: T) => number
 * The result of this function is what the values from the source iterable will be
 * compared by.
 *
 * @parameter
 * order
 * 'asc' | 'desc'
 * Whether the values should be sorted in the ascending or descending order.
 *
 * @returns
 * IterableIterator<T>
 *
 * @example
 * j.pipe(
 *   [5, 2, 6, 3, 1, 6],
 *   j.sort(t => t, 'asc'),
 * )
 * // => [1, 2, 3, 5, 6, 6]
 *
 * @example
 * j.pipe(
 *   [
 *     { name: 'foo-1', age: 19 },
 *     { name: 'bar', age: 21 },
 *     { name: 'foo-2', age: 19 },
 *     { name: 'baz', age: 18 },
 *   ],
 *   j.sortBy(t => t.age),
 * )
 * // => [
 * //   { name: 'bar', age: 21 },
 * //   { name: 'foo-1', age: 19 },
 * //   { name: 'foo-2', age: 19 },
 * //   { name: 'baz', age: 18 },
 * // ]
 */
export function sortBy<T> (project: Unary<T, number>, order: 'asc' | 'desc'): Operator<T, T>
export function sortBy<T> (pick: ViableKeys<T>, order: 'asc' | 'desc'): Operator<T, T>
export function sortBy<T> (projectOrPick: ViableKeys<T> | Unary<T, number>, order: 'asc' | 'desc'): Operator<T, T> {
  const map = typeof projectOrPick == 'function' ? projectOrPick : ((t: T): number => (t as any)[projectOrPick])
  const compareFn = (order == 'asc')
    ? (a: T, b: T) => (map(a) - map(b))
    : (a: T, b: T) => (map(b) - map(a))
  return sortUsing(compareFn)
}


/**
 * @short
 * *Sort* values in ascending or descending order.
 *
 * @categories
 * operator trigger
 *
 * @description
 * Returns a new iterable which emits all the same values as the source iterable,
 * but in different order.
 *
 * This is a specialization of {@link sortBy}, and therefore of {@link sortUsing} as well.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * order
 * 'asc' | 'desc'
 * Whether the values should be sorted in the ascending or descending order.
 *
 * @returns
 * IterableIterator<T>
 *
 * @example
 * j.pipe(
 *   [5, 2, 6, 3, 1, 6],
 *   j.sort('asc'),
 * )
 * // => [1, 2, 3, 5, 6, 6]
 */
export function sort (order: 'asc' | 'desc'): Operator<number, number> {
  return sortBy(identity, order)
}

type ValueOf<T> = T[keyof T]
type ViableKeys<T> = ValueOf<{ [K in keyof T]: T[K] extends number ? K : never }>

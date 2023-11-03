import { Operator } from '../core/types'
import { identity } from '../utils'


/**
 * @short
 * Breaks the iterable into *segments* whose items project into the same value.
 *
 * @categories
 * operator
 *
 * @description
 * Applies the given projection function to each value of the source iterable. As long as these projections are
 * equal (using `SameValue` equality, i.e. `Object.is`), values are collected into sub-arrays, which are yielded
 * together whenever the result of the projection function changes.
 *
 * This is a generalization of {@link segmentize} and {@link chunk}.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * project: (item: T, index: number) => unknown
 *
 * @returns
 * Operator<T, Array<T>>
 *
 * @example
 * j.pipe(
 *   [1, 5, 3, -1, -2, 1, -4],
 *   j.segmentizeBy(n => Math.sign(n)),
 * )
 * // => [
 * //   [1, 5, 3],
 * //   [-1, -2],
 * //   [1],
 * //   [-4],
 * // ]
 *
 * @example
 * j.pipe(
 *   ['foo', 'bar', 'Foo', 'bar', 'Bar'],
 *   j.segmentizeBy(n => n[0] == n[0].toUpperCase()),
 * )
 * // => [
 * //   ['foo', 'bar'],
 * //   ['Foo'],
 * //   ['bar'],
 * //   ['Bar'],
 * // ]
 *
 * @example
 * j.pipe(
 *   [10, 20, 30, 40, 50, 60, 70, 80, 90],
 *   j.segmentizeBy((n, i) => Math.floor(i / 4)),
 * )
 * // => [
 * //   [10, 20, 30, 40],
 * //   [50, 60, 70, 80],
 * //   [90],
 * // ]
 */
export function segmentizeBy<T> (
  project: (item: T, index: number) => unknown,
): Operator<T, Array<T>> {

  return function *(iterable: Iterable<T>): IterableIterator<Array<T>> {

    const iterator = iterable[Symbol.iterator]()

    const first = iterator.next()
    if (first.done) {
      return
    }

    let segmentItems = [first.value]
    let anchor = project(first.value, 0)

    let index = 1
    while (true) {
      const next = iterator.next()
      if (next.done) {
        break
      }
      const projected = project(next.value, index++)
      if (Object.is(projected, anchor)) {
        segmentItems.push(next.value)
      } else {
        yield segmentItems
        segmentItems = [next.value]
        anchor = projected
      }
    }

    yield segmentItems

    // prevent memory leaks
    segmentItems = null!
    anchor = null!

  }

}

/**
 * @short
 * Breaks the iterable into *segments* with equal items.
 *
 * @categories
 * operator
 *
 * @description
 * As long as items from the source iterable are equal (using `SameValue` equality, i.e. `Object.is`),
 * they will be collected into sub-arrays, which are yielded together whenever a different value
 * is encountered.
 *
 * This is a specialization of {@link segmentizeBy}.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * project: (item: T, index: number) => unknown
 *
 * @returns
 * Operator<T, Array<T>>
 *
 * @example
 * j.pipe(
 *   [1, 1, 2, 2, 2, 3],
 *   j.segmentize(),
 * )
 * // => [
 * //   [1, 1],
 * //   [2, 2, 2],
 * //   [3],
 * // ]
 */
export function segmentize () {
  return function *<T> (iterable: Iterable<T>): IterableIterator<Array<T>> {
    yield *segmentizeBy(identity)<T>(iterable)
  }
}

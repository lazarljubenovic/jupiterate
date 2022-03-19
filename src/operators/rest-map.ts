import { Operator } from '../core/types'
import { skip } from './skip'


/**
 * @short
 * Rest map.
 *
 * @categories
 * operator
 *
 * @description
 * Rest map.
 *
 * @since
 * 0.0.1
 *
 * @returns
 * Operator<T, T[]>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4],
 * )
 * // => [
 *   [1, [2, 3, 4]],
 *   [2, [3, 4]],
 *   [3, [4]],
 *   [4, []],
 * ]
 */
export function restMap<T> (): Operator<T, any> {
  return function (iterable: Iterable<T>): Iterable<[T, any]> {
    let i = 1
    const firstIterator = iterable[Symbol.iterator]()
    return {
      [Symbol.iterator] () {
        return {
          next () {
            const { done, value } = firstIterator.next()
            if (done) {
              return {
                done: true,
                value: undefined as any,
              }
            } else {
              return {
                done: false,
                value: [
                  value,
                  skip(i++)(iterable),
                ],
              }
            }
          },
        }
      },
    }
  }
}

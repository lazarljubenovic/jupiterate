import { Operator } from '../core/types'
import { joinWith as staticJoinWith } from '../static/join-with'

/**
 * @short
 * *Join* yielded values using a joiner.
 *
 * @categories
 * operator
 *
 * @description
 * Between each yielded value of the iterable this operator is applied on, an
 * additional value will be yielded.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * joiner
 * U
 * The additional value between every to yielded values.
 *
 * @returns
 * Operator<T, T | U>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3],
 *   j.join(0),
 * )
 * // => [1, 0, 2, 0, 3]
 */
export function join<T, U> (joiner: U): Operator<T, T | U> {
  return function (iterable: Iterable<T>): Iterable<T | U> {
    return staticJoinWith(joiner, iterable)
  }
}

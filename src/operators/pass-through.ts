import { Operator } from '../core/types'


/**
 * @short
 * Simply *passes through* all values.
 *
 * @categories
 * operator
 *
 * @description
 * Propagates all values from the source iterable, doing nothing to them.
 *
 * @since
 * 0.0.1
 *
 * @returns
 * Operator<T, T>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3],
 *   j.passThrough(),
 * )
 * // => [1, 2, 3]
 */
export function passThrough<T> (): Operator<T, T> {
  return function* (iterable: Iterable<T>): IterableIterator<T> {
    yield* iterable
  }
}

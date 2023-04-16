import { Operator } from '../core/types'
import { isIterable } from '../utils'
import { passThrough } from './pass-through'


/**
 * @short
 * *Flattens* nested iterables.
 *
 * @categories
 * operator
 *
 * @description
 * Yields values from within inner iterables. The iterables are being “unwinded” as many times as the given
 * depth argument.
 *
 * @since
 * 0.0.1
 *
 * @parameter [optional] [default = 1]
 * depth
 * number
 *
 * @returns
 * Operator<U, T>
 *
 * @throws
 * `RangeError` when the given `depth` parameter is not an integer, or is less than zero.
 *
 * @example
 * j.pipe(
 *   [[1, 2], [3], [4, 5, 6]],
 *   j.flatten(1),
 * )
 * // => [1, 2, 3, 4, 5, 6]
 *
 * @example
 * j.pipe(
 *   [
 *     [
 *       [111, 112],
 *       [121],
 *       [131, 132],
 *     ],
 *     [
 *       [211, 212, 213],
 *       [],
 *     ]
 *   ],
 *   j.flatten(2),
 * )
 * // => [111, 112, 121, 131, 132, 211, 212, 213]
 */
export function flatten<T> (): Operator<IterableIterator<T>, T>
export function flatten<T> (depth: 0): Operator<T, T>
export function flatten<T> (depth: 1): Operator<Iterable<T>, T>
export function flatten<T> (depth: 2): Operator<Iterable<Iterable<T>>, T>
export function flatten<T> (depth: 3): Operator<Iterable<Iterable<Iterable<T>>>, T>
export function flatten<T> (depth: 4): Operator<Iterable<Iterable<Iterable<Iterable<T>>>>, T>
export function flatten<T> (depth: 5): Operator<Iterable<Iterable<Iterable<Iterable<Iterable<T>>>>>, T>
export function flatten<T> (depth: 6): Operator<Iterable<Iterable<Iterable<Iterable<Iterable<Iterable<T>>>>>>, T>
export function flatten<T> (depth: 7): Operator<Iterable<Iterable<Iterable<Iterable<Iterable<Iterable<Iterable<T>>>>>>>, T>
export function flatten<T> (depth: 8): Operator<Iterable<Iterable<Iterable<Iterable<Iterable<Iterable<Iterable<Iterable<T>>>>>>>>, T>
export function flatten<T> (depth: 9): Operator<Iterable<Iterable<Iterable<Iterable<Iterable<Iterable<Iterable<Iterable<Iterable<T>>>>>>>>>, T>
export function flatten<T> (depth: number): Operator<T, any>
export function flatten<T> (depth: number = 1): Operator<T, any> {
  if (!Number.isInteger(depth) || depth < 0) throw new RangeError(`Depth must be an integer not less than 0; an attempt was made to define depth as ${depth}.`)
  if (depth == 0) return passThrough()
  return function *(iterable: Iterable<T>): IterableIterator<any> {
    for (const item of iterable) {
      if (!isIterable(item)) {
        throw new TypeError(`Cannot iterate over ${item}.`)
      }
      yield *flatten(depth - 1)(item)
    }
  }
}

function *_flattenDeep (iterable: Iterable<any>): IterableIterator<any> {
  for (const item of iterable) {
    if (isIterable(item)) {
      yield *_flattenDeep(item)
    } else {
      yield item
    }
  }
}

export function flattenDeep (): Operator<any, any> {
  return _flattenDeep
}

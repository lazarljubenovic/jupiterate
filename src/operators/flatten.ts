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
 *     ]
 *   ],
 *   j.flatten(1),
 * )
 * // => [[111, 112], [121], [131], [211, 212, 213]]
 */
export function flatten<T> (): Operator<IterableIterator<T>, T>
export function flatten<T> (depth: 0): Operator<T, T>
export function flatten<T> (depth: 1): Operator<IterableIterator<T>, T>
export function flatten<T> (depth: 2): Operator<IterableIterator<IterableIterator<T>>, T>
export function flatten<T> (depth: 3): Operator<IterableIterator<IterableIterator<IterableIterator<T>>>, T>
export function flatten<T> (depth: 4): Operator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<T>>>>, T>
export function flatten<T> (depth: 5): Operator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<T>>>>>, T>
export function flatten<T> (depth: 6): Operator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<T>>>>>>, T>
export function flatten<T> (depth: 7): Operator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<T>>>>>>>, T>
export function flatten<T> (depth: 8): Operator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<T>>>>>>>>, T>
export function flatten<T> (depth: 9): Operator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<IterableIterator<T>>>>>>>>>, T>
export function flatten<T> (depth: number): Operator<T, any>
export function flatten<T> (depth: number = 1): Operator<T, any> {
  if (depth < 0) throw new RangeError(`depth must be >= 0`)
  if (depth == 0) return passThrough()
  return function *(iterable: Iterable<T>): IterableIterator<any> {
    for (const item of iterable) {
      console.log(item)
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

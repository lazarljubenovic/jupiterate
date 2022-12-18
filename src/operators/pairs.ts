import { Operator } from '../core/types'
import { PairOptions, Pairs as staticPairs } from '../static/pairs'


/**
 * @short
 * @param options
 */
export function pairs<T> (options: PairOptions = {}): Operator<T, [T, T]> {
  return function (iterable: Iterable<T>): IterableIterator<[T, T]> {
    return staticPairs(iterable, options)
  }
}

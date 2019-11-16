import { Operator } from '../core/types'
import { PairOptions, pairs as staticPairs } from '../static/pairs'

/**
 * @short
 * @param options
 */
export function pairs<T> (options: PairOptions = {}): Operator<T, [T, T]> {
  return function (iterable: Iterable<T>): Iterable<[T, T]> {
    return staticPairs(iterable, options)
  }
}

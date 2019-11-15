import { Operator } from '../core/types'

export function map<T, V> (mapper: (item: T) => V): Operator<T, V> {
  return function* (iterable: Iterable<T>): IterableIterator<V> {
    for (const item of iterable) {
      yield mapper(item)
    }
  }
}


/**
 * Input:
 * - a
 * - b
 * - c
 * - d
 *
 * Output:
 * - [ a, [b, c, d] ]
 * - [ b, [c, d] ]
 * - [ c, [d] ]
 * - [ d, [] ]
 */


/**
 * Input:
 * - a
 * - b
 * - c
 * - d
 *
 *
 * Output, withRepeating: false, count: 2, orderImportant: false
 * - [a, b]   1 1 0 0
 * - [a, c]   1 0 1 0
 * - [a, d]   1 0 0 1
 * - [b, c]   0 1 1 0
 * - [b, d]   0 1 0 1
 * - [c, d]   0 0 1 1
 *
 * Output, withRepeating: true, count: 2, orderImportant: false
 * - [a, a]
 * - [a, b]
 * - [a, c]
 * - [a, d]
 * - [b, b]
 * - [b, c]
 * - [b, d]
 * - [c, c]
 * - [c, d]
 * - [d, d]
 *
 * - sa ponavljanjem
 * - bez
 *
 * - count
 *
 * - redosled vazan
 * - nije
 *
 *
 */

interface Options {
  withRepeating: boolean
  count: number
  orderImportant: boolean
}

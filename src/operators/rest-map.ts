import { Operator } from '../core/types'
import { skip } from './skip'

export function restMap<T> (): Operator<T, [T, any]> {
  return function (iterable: Iterable<T>) {
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

import { Operator, Unary } from '../core/types'
import { identity } from '../utils'

export function sortUniqueBy<T, U> (map: Unary<T, U>): Operator<T, T> {
  return function* (iterable: Iterable<T>): Iterable<T> {
    let prevItemMapped: U | undefined
    for (const item of iterable) {
      const mappedItem = map(item)
      if (prevItemMapped === mappedItem) {
        prevItemMapped = mappedItem
        continue
      }
      prevItemMapped = mappedItem
      yield item
    }
  }
}

const _sortUnique = sortUniqueBy(identity)

export function sortUnique<T> (): Operator<T, T> {
  return _sortUnique
}

import { Operator, Unary } from '../core/types'
import { identity } from '../utils'


export function sortWith<T> (compareFn: (a: T, b: T) => number): Operator<T, T> {
  return function *(iterable: Iterable<T>): Iterable<T> {
    const array = Array.from(iterable)
    array.sort(compareFn)
    yield *array
  }
}

export function sortBy<T> (map: Unary<T, number>, order: 'asc' | 'desc'): Operator<T, T>
export function sortBy<T> (pick: ViableKeys<T>, order: 'asc' | 'desc'): Operator<T, T>
export function sortBy<T> (mapOrPropName: ViableKeys<T> | Unary<T, number>, order: 'asc' | 'desc'): Operator<T, T> {
  const map = typeof mapOrPropName == 'function' ? mapOrPropName : ((t: T): number => (t as any)[mapOrPropName])
  const compareFn = (a: T, b: T) => (map(a) - map(b)) * (order == 'asc' ? 1 : -1)
  return sortWith(compareFn)
}

export function sort (order: 'asc' | 'desc'): Operator<number, number> {
  return sortBy(identity, order)
}

type ValueOf<T> = T[keyof T]
type ViableKeys<T> = ValueOf<{ [K in keyof T]: T[K] extends number ? K : never }>

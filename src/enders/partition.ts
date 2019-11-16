import { Ender } from '../core/types'
import { filter } from '../operators'
import { not } from '../utils'

export function partition<T, U extends T> (guard: (t: T) => t is U): Ender<T, [Iterable<U>, Iterable<Exclude<T, U>>]>
export function partition<T> (predicate: (t: T) => boolean): Ender<T, [Iterable<T>, Iterable<T>]>
export function partition<T> (predicate: (t: T) => boolean): Ender<T, [Iterable<T>, Iterable<T>]> {
  return function (iterable: Iterable<T>): [Iterable<T>, Iterable<T>] {
    return [
      filter(predicate)(iterable),
      filter(not(predicate))(iterable),
    ]
  }
}

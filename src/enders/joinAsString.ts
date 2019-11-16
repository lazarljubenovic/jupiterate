import { Ender } from '../core/types'
import { joinWith } from '../static/joinWith'

export function joinAsString<T> (joiner: string): Ender<T, string> {
  return function (iterable: Iterable<T>): string {
    return String(joinWith(joiner, iterable))
  }
}

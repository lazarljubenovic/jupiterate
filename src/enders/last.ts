import { Ender } from '../core/types'

function _last<T> (iterable: Iterable<T>): T | undefined {
  let current: T | undefined
  for (const item of iterable) {
    current = item
  }
  return current
}

export function last<T> (): Ender<T, T | undefined> {
  return _last
}

import { Operator } from '../core/types'

export function slice<T> (start: number = 0, end: number = Infinity): Operator<T, T> {
  if (end < start) throw new Error(`start (${start}) cannot be larger than end (${end})`)
  return function* (iterable: Iterable<T>): Iterable<T> {
    let index = -1
    for (const item of iterable) {
      index++
      if (index < start) continue
      if (index < end) {
        yield item
        continue
      }
      return
    }
  }
}

import { Ender } from '../core/types'


export function forEach<T> (fn: (item: T, index: number) => void): Ender<T, void> {
  return (iterable: Iterable<T>) => {
    let index: number = 0
    for (const item of iterable) {
      fn(item, index++)
    }
  }
}

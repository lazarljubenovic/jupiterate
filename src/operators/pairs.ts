import { Operator } from '../core/types'

export interface PairOptions {
  withRepetition?: boolean
  orderImportant?: boolean
}

function* _pairs<T> (iterable: Iterable<T>, { orderImportant, withRepetition }: PairOptions = {}): Iterable<[T, T]> {
  const arr = Array.from(iterable)
  if (orderImportant && !withRepetition) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (i == j) continue
        yield [arr[i], arr[j]]
      }
    }
    return
  }
  for (let i = 0; i < arr.length; i++) {
    const start = orderImportant ? 0 : withRepetition ? i : i + 1
    for (let j = start; j < arr.length; j++) {
      yield [arr[i], arr[j]]
    }
  }
}

export function pairs<T> (options: PairOptions): Operator<T, [T, T]> {
  return function (iterable: Iterable<T>): Iterable<[T, T]> {
    return _pairs(iterable, options)
  }
}

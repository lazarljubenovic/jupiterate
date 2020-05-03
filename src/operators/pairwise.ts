import { Operator } from '../core/types'
import { takeFirst } from './take-first'

export function pairwise<T> (): Operator<T, [T, T]> {
  return function* (iterable: Iterable<T>): Iterable<[T, T]> {
    let [prev] = takeFirst<T>(1)(iterable)
    for (const value of iterable) {
      yield [prev, value]
      prev = value
    }
  }
}

export function pairwiseCyclic<T> (): Operator<T, [T, T]> {
  return function* (iterable: Iterable<T>): Iterable<[T, T]> {
    const [first] = takeFirst<T>(1)(iterable)
    let prev = first
    for (const value of iterable) {
      yield [prev, value]
      prev = value
    }
    yield [prev, first]
  }
}

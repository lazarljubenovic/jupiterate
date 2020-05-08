import { Operator } from '../core/types'
import { takeFirst } from './take-first'

const EMPTY = Symbol('EMPTY')

export function pairwise<T> (): Operator<T, [T, T]> {
  return function* (iterable: Iterable<T>): Iterable<[T, T]> {
    let prev: T
    let isFirst = true
    for (const value of iterable) {
      if (!isFirst) {
        yield [prev!, value]
      }
      prev = value
      isFirst = false
    }
  }
}

export function pairwiseCyclic<T> (): Operator<T, [T, T]> {
  return function* (iterable: Iterable<T>): Iterable<[T, T]> {
    let prev: T
    let first: T
    let isFirst = true
    let isNonZero = false
    for (const value of iterable) {
      isNonZero = true
      if (!isFirst) {
        yield [prev!, value]
      } else {
        first = value
      }
      prev = value
      isFirst = false
    }
    if (isNonZero) {
      yield [prev!, first!]
    }
  }
}

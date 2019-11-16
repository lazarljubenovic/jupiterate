import { Ender } from '../core/types'

export function noop () {
  // empty
}

export function identity<T> (t: T) {
  return t
}

export function qqq<T> (a: T, b: T): boolean {
  return a === b
}

export function compareBy<T, V> (map: (t: T) => V, eq: (a: V, b: V) => boolean) {
  return (a: T, b: T) => eq(map(a), map(b))
}

export function isIterable (x: any): x is Iterable<any> {
  if (x == null) return false
  return typeof x[Symbol.iterator] == 'function'
}

export function orThrow<T, R extends undefined> (ender: Ender<T, R>): Ender<T, Exclude<R, undefined>> {
  return function (iterable: Iterable<T>): Exclude<R, undefined> {
    const result = ender(iterable)
    if (result === undefined) {
      throw new Error(`Expected result to not be undefined.`)
    }
    return result
  }
}

export function not<A> (fn: (a: A) => true): (a: A) => false
export function not<A> (fn: (a: A) => false): (a: A) => true
export function not<A> (fn: (a: A) => boolean): (a: A) => boolean
export function not (fn: (...args: any[]) => boolean): (...args: any[]) => boolean {
  return (...args: any[]) => !fn(...args)
}

export const lt = (a: number, b: number) => a < b
export const gt = (a: number, b: number) => a > b

